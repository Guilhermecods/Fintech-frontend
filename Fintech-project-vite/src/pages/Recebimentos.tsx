import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import DateFilter from "../components/DateFilter";
import TransactionList from "../components/TransactionList";
import TransactionEditCard from "../components/TransactionEditCard";
import { Link, useNavigate } from "react-router-dom";
import type { Receipts } from "../shared/@types/transactions";
import { deleteReceipt, getReceipts, updateReceipt } from "../shared/services/receipts";

// Helper function to parse dtRecebimento (ISO format or date string) to date and time
const parseReceiptDate = (dtRecebimento: string): { date: string; time: string } => {
    // If it's an ISO string with time (e.g., "2025-04-11T16:03:00")
    if (dtRecebimento.includes("T")) {
        const [datePart, timePart] = dtRecebimento.split("T");
        const time = timePart ? timePart.substring(0, 5) : "00:00"; // Extract HH:MM
        return { date: datePart, time };
    }
    // If it's just a date (e.g., "2025-04-11")
    return { date: dtRecebimento, time: "00:00" };
};

const Recebimentos: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    
    const token = useMemo(() => localStorage.getItem("token"), []);
    const isLoggedIn = useMemo(() => token !== null, [token]);
    
    const [recebimentos, setRecebimentos] = useState<Receipts[]>([]);
    const [loading, setLoading] = useState(true);

    // Controle do modal - store the cdRecebimento ID instead of index
    const [editingId, setEditingId] = useState<number | null>(null);

    
    const fetchReceipts = async () => {
        if (!isLoggedIn || !token) {
            navigate("/");
            return;
        }
        try {
            setLoading(true);
            const receipts = await getReceipts(token);
            setRecebimentos(receipts);
        } catch (error) {
            console.error("Error fetching receipts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReceipts();
    }, []);

    const filtered = recebimentos.filter((receipt) => {
        const matchesQuery =
            receipt.nmRecebimento.toLowerCase().includes(searchQuery.toLowerCase()) ||
            receipt.vlRecebimento.toString().includes(searchQuery);
        
        const { date } = parseReceiptDate(receipt.dtRecebimento);
        const matchesDate = selectedDate ? date === selectedDate : true;
        
        return matchesQuery && matchesDate;
    });

    const handleDelete = async (index: number) => {
        const receiptToDelete = filtered[index];
        await deleteReceipt(receiptToDelete);
        setRecebimentos((prev) => prev.filter((receipt) => receipt.cdRecebimento !== receiptToDelete.cdRecebimento));
    };

    const handleUpdate = (index: number) => {
        const receiptToEdit = filtered[index];
        setEditingId(receiptToEdit.cdRecebimento);
    };

    const handleSave = async (updated: { title: string; amount: number; date: string; time: string }) => {
        if (editingId === null || !token) return;

        const receipt = recebimentos.find((rec) => rec.cdRecebimento === editingId);
        if (!receipt) return;
        
        const updatedReceipt: Receipts = {
            cdRecebimento: receipt.cdRecebimento,
            dsRecebimento: receipt.dsRecebimento,
            nmRecebimento: updated.title,
            vlRecebimento: updated.amount,
            cdUsuario: receipt.cdUsuario,
            cdCategoria: receipt.cdCategoria,
            dtRecebimento: `${updated.date}T${updated.time}:00`,
        };

        await updateReceipt(updatedReceipt);
        
        setEditingId(null);
        
        await fetchReceipts();
    };

    // Convert filtered receipts to TransactionCard format
    const cardTransactions = filtered.map((receipt) => {
        const { date, time } = parseReceiptDate(receipt.dtRecebimento);
        return {
            title: receipt.nmRecebimento,
            date,
            time,
            amount: receipt.vlRecebimento,
        };
    });

    // Find the receipt being edited to get its card format
    const editingReceipt = editingId !== null 
        ? recebimentos.find((rec) => rec.cdRecebimento === editingId)
        : null;
    
    const editingCardData = editingReceipt 
        ? (() => {
            const { date, time } = parseReceiptDate(editingReceipt.dtRecebimento);
            return {
                title: editingReceipt.nmRecebimento,
                date,
                time,
                amount: editingReceipt.vlRecebimento,
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
                placeholder="Pesquisar recebimento..."
            />
            {loading ? (
                <div className="mt-6 text-gray-400">Carregando recebimentos...</div>
            ) : (
                <TransactionList
                    transactions={cardTransactions}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    variant="receita"
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

export default Recebimentos;
