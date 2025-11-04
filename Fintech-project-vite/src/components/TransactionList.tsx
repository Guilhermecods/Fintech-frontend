import TransactionCard from "./TransactionCard";

interface Transaction {
    title: string;
    date: string;
    time: string;
    amount: number;
}

interface TransactionListProps {
    transactions: Transaction[];
    onDelete: (index: number) => void;
    onUpdate: (index: number) => void;
    variant?: "receita" | "gasto" ;
}

const TransactionList: React.FC<TransactionListProps> = ({
    transactions,
    onDelete,
    onUpdate,
    variant = "receita",
}) => {
    return (
        <div className="w-full max-w-md mt-6">
            {transactions.map((t, i) => (
                <TransactionCard
                    key={i}
                    {...t}
                    index={i}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    variant={variant}
                />
            ))}
        </div>
    );
};

export default TransactionList;
