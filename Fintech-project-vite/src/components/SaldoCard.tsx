interface SaldoCardProps {
    saldo: number;
}

const SaldoCard: React.FC<SaldoCardProps> = ({ saldo }) => {
    return (
        <div className="bg-[#C3C3C3] rounded-lg p-4 text-center w-60">
            <p className="text-gray-800 text-sm mb-2">Saldo Atual</p>
            <div className="bg-[#DBDBDB] hover:bg-gray-100 transition rounded-md p-4">
                <p className="text-xl font-bold">
                    R${saldo.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default SaldoCard;
