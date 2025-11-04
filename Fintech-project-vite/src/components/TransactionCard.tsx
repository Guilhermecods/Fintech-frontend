import { Trash2, RotateCcw } from "lucide-react";

interface TransactionCardProps {
    title: string;
    date: string;
    time: string;
    amount: number;
    index: number;
    onDelete: (index: number) => void;
    onUpdate: (index: number) => void;
    variant?: "receita" | "gasto" ;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
    title,
    date,
    time,
    amount,
    index,
    onDelete,
    onUpdate,
    variant = "receita",
}) => {
    const styles = {
        receita: {
            bg: "bg-gray-200",
            text: "text-[#184C43]",
        },
        gasto: {
            bg: "bg-gray-200",
            text: "text-red-600",
        }
        
    };

    const style = styles[variant];

    return (
        <div
            className={`flex justify-between items-center ${style.bg} p-4 rounded-md my-2 shadow transition`}
        >
            <div>
                <p className={`font-semibold ${style.text}`}>{title}</p>
                <p className="text-sm text-gray-600">
                    {date} | {time}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <p className={`font-semibold ${style.text}`}>
                    R$ {amount.toFixed(2)}
                </p>
                <RotateCcw
                    onClick={() => onUpdate(index)}
                    className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600 transition"
                    title="Atualizar recebimento"
                    {...({} as React.HTMLAttributes<SVGElement>)}
                />
                <Trash2
                    onClick={() => onDelete(index)}
                    className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-600 transition"
                    title="Excluir recebimento"
                    {...({} as React.HTMLAttributes<SVGElement>)} // <- força o TS a aceitar
                />

            </div>
        </div>
    );
};

export default TransactionCard;
