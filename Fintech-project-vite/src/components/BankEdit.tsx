// src/components/BankEditModal.tsx
import { useState, useEffect } from "react";
import type { Bank } from "./BankItem";


interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (bank: Bank) => void;
    initialData?: Bank;
}

const BankEdit: React.FC<Props> = ({ isOpen, onClose, onSave, initialData }) => {
    const [nr_agencia, setNrAgencia] = useState<number | ''>('');
    const [nr_conta, setNrConta] = useState<number | ''>('');
    const [cpf, setCpf] = useState("");
    const [nr_banco, setNrBanco] = useState<number | ''>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (initialData) {
            setNrAgencia(initialData.nr_agencia);
            setNrConta(initialData.nr_conta);
            setCpf(initialData.cpf);
            setNrBanco(initialData.nr_banco);
        } else {
            setNrAgencia('');
            setNrConta('');
            setCpf('');
            setNrBanco('');
        }
        setErrors({});
    }, [initialData]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!nr_agencia) newErrors.nr_agencia = "Agência obrigatória";
        if (!nr_conta) newErrors.nr_conta = "Conta obrigatória";
        if (!cpf || !/^\d{11}$/.test(cpf)) newErrors.cpf = "CPF inválido";
        if (!nr_banco) newErrors.nr_banco = "Banco obrigatório";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onSave({
                nr_agencia: Number(nr_agencia),
                nr_conta: Number(nr_conta),
                cpf,
                nr_banco: Number(nr_banco),
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-sm">
                <h2 className="text-white text-lg font-semibold mb-4">{initialData ? "Editar Banco" : "Adicionar Banco"}</h2>

                <div className="mb-2">
                    <input
                        type="number"
                        placeholder="Número da Agência"
                        value={nr_agencia}
                        onChange={(e) => setNrAgencia(Number(e.target.value))}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                    {errors.nr_agencia && <p className="text-red-500 text-sm">{errors.nr_agencia}</p>}
                </div>

                <div className="mb-2">
                    <input
                        type="number"
                        placeholder="Número da Conta"
                        value={nr_conta}
                        onChange={(e) => setNrConta(Number(e.target.value))}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                    {errors.nr_conta && <p className="text-red-500 text-sm">{errors.nr_conta}</p>}
                </div>

                <div className="mb-2">
                    <input
                        type="text"
                        placeholder="CPF (somente números)"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
                        maxLength={11}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                    {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
                </div>

                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Código do Banco"
                        value={nr_banco}
                        onChange={(e) => setNrBanco(Number(e.target.value))}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                    {errors.nr_banco && <p className="text-red-500 text-sm">{errors.nr_banco}</p>}
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-[#122925] hover:bg-green-900 text-white px-4 py-2 rounded-lg"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BankEdit;
