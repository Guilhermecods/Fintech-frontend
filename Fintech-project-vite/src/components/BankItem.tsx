// src/components/BankItem.tsx
import React from "react";

export interface Bank {
    nr_agencia: number;
    nr_conta: number;
    cpf: string;
    nr_banco: number;
}

interface Props {
    bank: Bank;
    onEdit: () => void;
    onDelete: () => void;
}

const BankItem: React.FC<Props> = ({ bank, onEdit, onDelete }) => {
    return (
        <div className="bg-[#C3C3C3] p-4 rounded-lg flex justify-between items-center">
            <div>
                <p className="text-[#122925] font-bold">Banco: {bank.nr_banco}</p>
                <p className="text-[#122925] text-semibold">Agência: {bank.nr_agencia}</p>
                <p className="text-[#122925] text-semibold">Conta: {bank.nr_conta}</p>
                <p className="text-[#122925] text-semibold">CPF: {bank.cpf}</p>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={onEdit}
                    className="bg-[#122925] hover:bg-green-900 text-white px-3 py-1  text-sm"
                >
                    Editar
                </button>
                <button
                    onClick={onDelete}
                    className="bg-[#b91c1c] hover:bg-red-400 text-white px-3 py-1  text-sm"
                >
                    Excluir
                </button>
            </div>
        </div>
    );
};

export default BankItem;
