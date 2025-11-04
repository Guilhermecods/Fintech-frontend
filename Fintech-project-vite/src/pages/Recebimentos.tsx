import { useState } from "react";
import Navbar from "../components/Navbar";
import DateFilter from "../components/DateFilter";
import TransactionList from "../components/TransactionList";
import TransactionEditCard from "../components/TransactionEditCard";
import { Link } from "react-router-dom";


interface Transaction {
    title: string;
    date: string;
    time: string;
    amount: number;
}

const Recebimentos: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [recebimentos, setRecebimentons] = useState<Transaction[]>([
        { title: "Serviço", date: "2025-11-11", time: "16:03", amount: 195.9 },
        { title: "Venda", date: "2025-10-10", time: "15:22", amount: 30.9 },
        { title: "Freela", date: "2025-09-11", time: "09:41", amount: 125.0 },
        { title: "Serviço", date: "2025-11-11", time: "16:03", amount: 195.9 },
        { title: "Venda", date: "2025-10-10", time: "15:22", amount: 30.9 },
        { title: "Freela", date: "2025-09-11", time: "09:41", amount: 125.0 },
    ]);
    

    // controle do modal
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleDelete = (index: number) => {
        setRecebimentons((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpdate = (index: number) => {
        setEditingIndex(index);
    };

    const handleSave = (updated: Transaction) => {
        if (editingIndex === null) return;
        setRecebimentons((prev) =>
            prev.map((t, i) => (i === editingIndex ? updated : t))
        );
    };

    const filtered = recebimentos.filter((t) => {
        const matchesQuery =
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.amount.toString().includes(searchQuery);
        const matchesDate = selectedDate ? t.date === selectedDate : true;
        return matchesQuery && matchesDate;
    });

    return (
        <div className="min-h-screen bg-[#122925] flex flex-col items-center">
            <Link to={"/home"}><Navbar /></Link>
            <DateFilter
                date={selectedDate}
                onDateChange={setSelectedDate}
                onSearch={setSearchQuery}
            />
            <TransactionList
                transactions ={filtered}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                variant="receita"
            />

            {editingIndex !== null && (
                <TransactionEditCard
                    isOpen={editingIndex !== null}
                    onClose={() => setEditingIndex(null)}
                    onSave={handleSave}
                    initialData={recebimentos[editingIndex]}
                />
            )}
        </div>
    );
};

export default Recebimentos;
