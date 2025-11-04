import { Link } from "react-router-dom";
import Button from "../components/Button";
import MenuButton from "../components/MenuButton";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import { AiFillSecurityScan, AiFillSetting, AiOutlineCreditCard, AiOutlineGift, AiOutlineQuestion } from "react-icons/ai";

const Profile: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col bg-[#122925]">
            <Link to={"/home"}><Navbar /></Link>

            <div className="flex flex-col items-center justify-center  px-6 mt-5">
                <div className="w-full max-w-lg rounded-lg space-y-4 border border-[#122925] p-6 bg-[#C3C3C3] ">
                    <div className="justify-center flex">
                        <ProfileCard name="NOME COMPLETO" id="0451-3" /></div>

                    <MenuButton icon={<AiOutlineCreditCard />} label="Meus Cartões" />
                    <MenuButton icon={<AiFillSetting />} label="Configurações do App" />
                    <MenuButton icon={<AiFillSecurityScan />} label="Segurança e Privacidade" />
                    <MenuButton icon={<AiOutlineGift />} label="Indicar Amigos" />
                    <MenuButton icon={<AiOutlineQuestion />} label="Sobre o CashApp" />




                    <div className="mt-9  justify-center flex">
                    <Button text="Logout" onClick={() => console.log("Cadastrado")}  /></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
