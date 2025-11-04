import React from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

interface InvestimentoProps {
  tipo: string;
  nome: string;
  valor: number;
  rendimento: string;
  positivo: boolean;
}

const InvestimentoCard: React.FC<InvestimentoProps> = ({
  tipo,
  nome,
  valor,
  rendimento,
  positivo,
}) => {
  return (
    <div className="bg-[#D9D9D9] rounded-xl p-4 text-black shadow-md">
      <p className="text-xs font-semibold text-gray-600">{tipo}</p>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">{nome}</p>
        <div className="flex items-center space-x-1 text-sm font-bold">
          {positivo ? (
            <FiArrowDownRight size={16} className="text-green-500" />
          ) : (
            <FiArrowUpRight size={16} className="text-red-500" />
          )}
          <span className={positivo ? "text-green-600" : "text-red-600"}>
            {rendimento}
          </span>
        </div>
      </div>
      <p className="text-md font-bold mt-2">R${valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
    </div>
  );
};

export default InvestimentoCard;
