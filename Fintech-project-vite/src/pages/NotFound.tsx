import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#122925]">
      <Navbar />
      <div className="flex flex-col items-center justify-center  px-6 mt-5">
        <div className="w-full max-w-lg rounded-lg space-y-4 border border-[#122925] p-6 bg-[#C3C3C3] ">
          <h1 className="text-2xl font-bold">Página não encontrada</h1>
          <p className="text-sm text-gray-700 font-semibold">
            A página que você está procurando não existe.
          </p>
          <Link to="/" className="text-green-800 text-lg hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
