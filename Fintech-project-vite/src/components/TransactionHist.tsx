import type { ReactNode } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

interface TransactionHistProps {
  icon: ReactNode;
  title: string;
  value: number;
  type: "in" | "out";
}

const TransactionHist: React.FC<TransactionHistProps> = ({
  icon,
  title,
  value,
  type,
}) => {
  const color = type === "in" ? "text-[#16a34a]" : "text-red-600";
  const arrow =
    type === "in" ? (
      <FaArrowAltCircleDown color="#16a34a" />
    ) : (
      <FaArrowAltCircleUp color="#FF5A5A" />
    );

  return (
    <div className="flex justify-between items-center bg-[#D9D9D9] rounded-lg p-5 m-4  border hover:bg-gray-100 transition-colors duration-300 shadow-md">
      <div className="flex items-center gap-5">
        <div>{icon}</div>
        <p className={`${color} font-short`}>{title}</p>
      </div>
      <p className={`${color}`}>R${value.toFixed(2)}</p>
      <div>
        <span>{arrow}</span>
      </div>
    </div>
  );
};

export default TransactionHist;
