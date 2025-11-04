// src/pages/GerenciarBancos.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import type { Bank } from "../components/BankItem";
import BankItem from "../components/BankItem";
import BankEdit from "../components/BankEdit";


const GerenciarBancos: React.FC = () => {
    const [banks, setBanks] = useState<Bank[]>([
        { nr_agencia: 1234, nr_conta: 567890, cpf: "12345678901", nr_banco: 1 },
        { nr_agencia: 4321, nr_conta: 987654, cpf: "98765432100", nr_banco: 33 },
    ]);

    const [bankToEdit, setBankToEdit] = useState<Bank | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdd = () => {
        setBankToEdit(null);
        setIsModalOpen(true);
    };

    const handleEdit = (bank: Bank) => {
        setBankToEdit(bank);
        setIsModalOpen(true);
    };

    const handleDelete = (bank: Bank) => {
        setBanks((prev) => prev.filter((b) => b !== bank));
    };

    const handleSave = (bank: Bank) => {
        if (bankToEdit) {
            setBanks((prev) => prev.map((b) => (b === bankToEdit ? bank : b)));
        } else {
            setBanks((prev) => [...prev, bank]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#122925] flex flex-col items-center p-4">
            <Link to="/home"><Navbar /></Link>

            <div className="w-full max-w-md mt-6">
                <h2 className="text-white text-xl font-bold mb-4">Gerenciar Bancos</h2>
                <button
                    onClick={handleAdd}
                    className="mb-4 w-full bg-[#C3C3C3] hover:bg-gray-100 text-[#122925] font-semibold py-2 rounded-lg transition"
                >
                    Adicionar Banco
                </button>

                <div className="space-y-4">
                    {banks.map((bank, index) => (
                        <BankItem
                            key={index}
                            bank={bank}
                            onEdit={() => handleEdit(bank)}
                            onDelete={() => handleDelete(bank)}
                        />
                    ))}
                </div>
            </div>

            <BankEdit
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={bankToEdit || undefined}
            />
        </div>
    );
};

export default GerenciarBancos;
