import React, { useState } from "react";

interface TransactionEditCardProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (updated: { title: string; amount: number; date: string; time: string }) => void;
    initialData: { title: string; amount: number; date: string; time: string };
}

const TransactionEditCard: React.FC<TransactionEditCardProps> = ({
    isOpen,
    onClose,
    onSave,
    initialData,
}) => {
    const [form, setForm] = useState(initialData);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(form);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Editar Recebimento
                </h2>

                <div className="space-y-3">
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Título"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="Valor"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div className="flex justify-end gap-2 mt-5">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionEditCard;
