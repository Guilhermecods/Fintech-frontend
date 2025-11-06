import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import DateFilter from "../components/DateFilter";
import TransactionList from "../components/TransactionList";
import TransactionEditCard from "../components/TransactionEditCard";
import { Link, useNavigate } from "react-router-dom";
import type { Expenses } from "../shared/@types/transactions";
import { deleteExpense, getExpenses, updateExpense } from "../shared/services/expenses";

// Helper function to parse dtGasto (ISO format or date string) to date and time
const parseExpenseDate = (dtGasto: string): { date: string; time: string } => {
    // If it's an ISO string with time (e.g., "2025-04-11T16:03:00")
    if (dtGasto.includes("T")) {
        const [datePart, timePart] = dtGasto.split("T");
        const time = timePart ? timePart.substring(0, 5) : "00:00"; // Extract HH:MM
        return { date: datePart, time };
    }
    // If it's just a date (e.g., "2025-04-11")
    return { date: dtGasto, time: "00:00" };
};

const Gastos: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    
    const token = useMemo(() => localStorage.getItem("token"), []);
    const isLoggedIn = useMemo(() => token !== null, [token]);
    
    const [gastos, setGastos] = useState<Expenses[]>([]);
    const [loading, setLoading] = useState(true);

    // Controle do modal - store the cdGasto ID instead of index
    const [editingId, setEditingId] = useState<number | null>(null);

    
    const fetchExpenses = async () => {
        if (!isLoggedIn || !token) {
            navigate("/");
            return;
        }
        try {
            setLoading(true);
            const expenses = await getExpenses(token);
            setGastos(expenses);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const filtered = gastos.filter((expense) => {
        const matchesQuery =
            expense.nmGasto.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expense.vlGasto.toString().includes(searchQuery);
        
        const { date } = parseExpenseDate(expense.dtGasto);
        const matchesDate = selectedDate ? date === selectedDate : true;
        
        return matchesQuery && matchesDate;
    });

    const handleDelete = async (index: number) => {
        const expenseToDelete = filtered[index];
        await deleteExpense(expenseToDelete);
        setGastos((prev) => prev.filter((expense) => expense.cdGasto !== expenseToDelete.cdGasto));
    };

    const handleUpdate = (index: number) => {
        const expenseToEdit = filtered[index];
        setEditingId(expenseToEdit.cdGasto);
    };

    const handleSave = async (updated: { title: string; amount: number; date: string; time: string }) => {
        if (editingId === null || !token) return;

        const gasto = gastos.find((expense) => expense.cdGasto === editingId);
        if (!gasto) return;
        
        const updatedExpense: Expenses = {
            cdGasto: gasto.cdGasto,
            dsGasto: gasto.dsGasto,
            nmGasto: updated.title,
            vlGasto: updated.amount,
            cdUsuario: gasto.cdUsuario,
            cdCategoria: gasto.cdCategoria,
            dtGasto: `${updated.date}T${updated.time}:00`,
        };

        await updateExpense(updatedExpense);
        
        setEditingId(null);
        
        await fetchExpenses();
    };

    const cardTransactions = filtered.map((expense) => {
        const { date, time } = parseExpenseDate(expense.dtGasto);
        return {
            title: expense.nmGasto,
            date,
            time,
            amount: expense.vlGasto,
        };
    });

    const editingExpense = editingId !== null 
        ? gastos.find((exp) => exp.cdGasto === editingId)
        : null;
    
    const editingCardData = editingExpense 
        ? (() => {
            const { date, time } = parseExpenseDate(editingExpense.dtGasto);
            return {
                title: editingExpense.nmGasto,
                date,
                time,
                amount: editingExpense.vlGasto,
            };
        })()
        : null;

    return (
        <div className="min-h-screen bg-[#122925] flex flex-col items-center">
            <Link to={"/home"}><Navbar /></Link>
            <DateFilter
                date={selectedDate}
                onDateChange={setSelectedDate}
                onSearch={setSearchQuery}
                placeholder="Pesquisar gasto..."
            />
            {loading ? (
                <div className="mt-6 text-gray-400">Carregando gastos...</div>
            ) : (
                <TransactionList
                    transactions={cardTransactions}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    variant="gasto"
                />
            )}

            {editingId !== null && editingCardData && (
                <TransactionEditCard
                    isOpen={editingId !== null}
                    onClose={() => setEditingId(null)}
                    onSave={handleSave}
                    initialData={editingCardData}
                />
            )}
        </div>
    );
};

export default Gastos;
