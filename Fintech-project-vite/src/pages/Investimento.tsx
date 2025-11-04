import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import ResumoInvestimentos from "../components/ResumoInvestimentos";
import InvestimentoCard from "../components/InvestimentoCard";

const Investimentos: React.FC = () => {
const [investimentos] = useState([
    {
    tipo: "RENDA FIXA",
    nome: "Tesouro Selic",
    valor: 15240,
    rendimento: "+8,2%",
    positivo: true,
    },
    {
    tipo: "RENDA VARIÁVEL",
    nome: "Ações ITUB4",
    valor: 12850,
    rendimento: "+15,7%",
    positivo: true,
    },
    {
    tipo: "FUNDOS IMOBILIÁRIOS",
    nome: "FII HGCL11",
    valor: 8810.5,
    rendimento: "-2,3%",
    positivo: false,
    },
]);

return (
    <div className="min-h-screen flex flex-col bg-[#0D221F] text-white">
    <Navbar />

    <div className="flex flex-col items-center mt-8 px-6">

        <div className="w-full max-w-sm bg-[#183530] rounded-xl p-5 shadow-lg space-y-4">
        <p className="text-sm text-gray-300">saldo total</p>
        <h1 className="text-3xl font-bold">R$ 45.320,50</h1>
        <p className="text-green-400 font-semibold">+12,5%</p>
        <p className="italic text-gray-400 text-sm">rendimento no mês</p>

        <ResumoInvestimentos />
        <Button text="Investir" onClick={() => alert("Tela de investimento em construção")} />
        </div>


        <div className="w-full max-w-sm mt-6 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Meus Investimentos</h2>
        {investimentos.map((item, index) => (
            <InvestimentoCard key={index} {...item} />
        ))}
        </div>
    </div>
    </div>
);
};

export default Investimentos;
