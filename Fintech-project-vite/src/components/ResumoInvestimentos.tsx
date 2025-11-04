import React from "react";

const ResumoInvestimentos: React.FC = () => {
return (
    <div className="flex justify-between mt-4">
    <div className="flex flex-col items-center text-sm">
        <p className="text-gray-400">Investido</p>
        <p className="font-semibold">R$ 38.500</p>
    </div>
    <div className="flex flex-col items-center text-sm">
        <p className="text-gray-400">Rendimento</p>
        <p className="font-semibold">R$ 6.820</p>
    </div>
    <div className="flex flex-col items-center text-sm">
        <p className="text-gray-400">Lucro</p>
        <p className="font-semibold text-green-400">+17,7%</p>
    </div>
    </div>
);
};

export default ResumoInvestimentos;
