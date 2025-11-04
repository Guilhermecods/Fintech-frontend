import Navbar from "../components/Navbar";


import { FaArrowDown, FaArrowUp, FaChartLine, FaCog, FaCar, FaPlane, FaDollarSign } from "react-icons/fa";
import { useState } from "react";
import SaldoCard from "../components/SaldoCard";
import ButtonSquareHome from "../components/ButtonSquareHome";
import NavButtonHome from "../components/NavButtonHome";
import TransactionHist from "../components/TransactionHist";
import { Link } from "react-router-dom";



const Home: React.FC = () => {
    const [saldo] = useState(10000);

    const transactions = [
        { icon: <FaCog />, title: "Serviço", value: 195.9, type: "in" },
        { icon: <FaPlane />, title: "Viagem", value: 105.5, type: "out" },
        { icon: <FaDollarSign />, title: "Vendas", value: 33.9, type: "in" },
        { icon: <FaCar />, title: "Combustível", value: 200.0, type: "out" },
        { icon: <FaCog />, title: "Serviço", value: 195.9, type: "in" },
        { icon: <FaPlane />, title: "Viagem", value: 105.5, type: "out" },

    ];

    return (
        <div className="min-h-screen  flex flex-col items-center  bg-[#122925] ">       
            <Navbar />
            <div className="flex flex-col items-center justify-center mb-4 w-full max-w-sm ">

            <div className="m-5">
            <SaldoCard saldo={saldo} />
            </div>

            <div className="flex gap-4 m-5">
                <Link to={"/gastos"}><ButtonSquareHome icon={<FaArrowDown size={24} color="#b91c1c" />} color="bg-[#C3C3C3]"  /></Link>
                <ButtonSquareHome icon={<FaChartLine size={24} color="#000" />} color="bg-[#C3C3C3]" />
                <Link to={"/recebimentos"}><ButtonSquareHome icon={<FaArrowUp size={24} color="#16a34a" />} color="bg-[#C3C3C3]" /></Link>
                

            </div>

            <NavButtonHome />

            <div className="bg-[#C3C3C3] text-gray-800 rounded-lg mt-8 p-4 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-2">Últimas atualizações: </h2>
                {transactions.map((t, i) => (
                    

                    
                    <TransactionHist
                        key={i}
                        icon={t.icon}
                        title={t.title}
                        value={t.value}
                        type={t.type as "in" | "out"}
                    />
                    
                ))}
                
            </div>
        </div>
        </div>
    );
};

export default Home;
