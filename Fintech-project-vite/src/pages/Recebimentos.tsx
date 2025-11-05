import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import DateFilter from "../components/DateFilter";
import TransactionList from "../components/TransactionList";
import TransactionEditCard from "../components/TransactionEditCard";
import { Link, useNavigate } from "react-router-dom";
import type { Receipts } from "../shared/@types/transactions";
import { getReceipts } from "../shared/services/receipts";

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

    useEffect(() => {
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
                // Em caso de erro, mantém o array vazio ou mostra mensagem de erro
            } finally {
                setLoading(false);
            }
        };

        fetchReceipts();
    }, [isLoggedIn, token, navigate]);

    const filtered = recebimentos.filter((receipt) => {
        const matchesQuery =
            receipt.nmRecebimento.toLowerCase().includes(searchQuery.toLowerCase()) ||
            receipt.vlRecebimento.toString().includes(searchQuery);
        
        const { date } = parseReceiptDate(receipt.dtRecebimento);
        const matchesDate = selectedDate ? date === selectedDate : true;
        
        return matchesQuery && matchesDate;
    });

    const handleDelete = (index: number) => {
        // Get the receipt from filtered array and find it in original array by cdRecebimento
        const receiptToDelete = filtered[index];
        setRecebimentos((prev) => prev.filter((receipt) => receipt.cdRecebimento !== receiptToDelete.cdRecebimento));
    };

    const handleUpdate = (index: number) => {
        // Get the receipt from filtered array and store its cdRecebimento
        const receiptToEdit = filtered[index];
        setEditingId(receiptToEdit.cdRecebimento);
    };

    const handleSave = async (updated: { title: string; amount: number; date: string; time: string }) => {
        if (editingId === null || !token) return;
        
        // Atualiza localmente (opcional: você pode fazer uma chamada PUT/PATCH para a API aqui)
        setRecebimentos((prev) =>
            prev.map((receipt) => {
                if (receipt.cdRecebimento === editingId) {
                    // Convert back to Receipts format
                    const dtRecebimento = `${updated.date}T${updated.time}:00`;
                    return {
                        ...receipt,
                        nmRecebimento: updated.title,
                        vlRecebimento: updated.amount,
                        dtRecebimento,
                    };
                }
                return receipt;
            })
        );
        setEditingId(null);
        
        // Opcional: recarrega da API para garantir sincronização
        // await fetchReceipts();
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
