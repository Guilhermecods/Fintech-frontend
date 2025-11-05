import Navbar from "../components/Navbar";

import {
  FaArrowDown,
  FaArrowUp,
  FaChartLine,
  FaCog,
  FaCar,
  FaPlane,
  FaDollarSign,
} from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import SaldoCard from "../components/SaldoCard";
import ButtonSquareHome from "../components/ButtonSquareHome";
import NavButtonHome from "../components/NavButtonHome";
import TransactionHist from "../components/TransactionHist";
import { Link, useNavigate } from "react-router-dom";
import type { UserInfo } from "@shared/@types/auth";
import { getUser } from "@shared/core/auth/auth";
import { getHistory } from "@/shared/services/history";
import { ICONS, type Transaction } from "@/shared/@types/transactions";

const Home: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  const token = useMemo(() => localStorage.getItem("token"), []);
  const isLoggedIn = useMemo(() => token !== null, [token]);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchHistory = async () => {
    if (!isLoggedIn) return navigate("/");
    const history = await getHistory(token!);
    setTransactions(history);
  };

  const fetchUser = async () => {
    if (!isLoggedIn) return navigate("/");
    const user = await getUser(token!);
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen  flex flex-col items-center  bg-[#122925] ">
      <Navbar />
      <div className="flex flex-col items-center justify-center mb-4 w-full max-w-sm ">
        <div className="m-5">
          <SaldoCard saldo={user?.vlSaldo || 0} />
        </div>

        <div className="flex gap-4 m-5">
          <Link to={"/gastos"}>
            <ButtonSquareHome
              icon={<FaArrowDown size={24} color="#b91c1c" />}
              color="bg-[#C3C3C3]"
            />
          </Link>
          <ButtonSquareHome
            icon={<FaChartLine size={24} color="#000" />}
            color="bg-[#C3C3C3]"
          />
          <Link to={"/recebimentos"}>
            <ButtonSquareHome
              icon={<FaArrowUp size={24} color="#16a34a" />}
              color="bg-[#C3C3C3]"
            />
          </Link>
        </div>

        <NavButtonHome />

        <div className="bg-[#C3C3C3] text-gray-800 rounded-lg mt-8 p-4 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">Últimas atualizações: </h2>
          {transactions
            .sort(
              (a, b) =>
                new Date(b.dtRecebimento || b.dtGasto).getTime() -
                new Date(a.dtRecebimento || a.dtGasto).getTime()
            )
            .map((t, i) => (
              <TransactionHist
                key={i}
                icon={ICONS[t.cdCategoria]}
                title={t.nmRecebimento || t.nmGasto}
                value={t.vlRecebimento || t.vlGasto}
                type={t.vlRecebimento > 0 ? "in" : "out"}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
