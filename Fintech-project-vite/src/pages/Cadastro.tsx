import { useState } from "react";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Checkbox from "../components/CheckBox";
import { Link } from "react-router-dom";

const Cadastro: React.FC = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [number, setNumber] = useState("");
    const [saldo, setSaldo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-[#122925]">
            <Navbar />

            <div className="flex flex-col items-center justify-center mt-5 px-6">
                <div className="w-full max-w-lg rounded-lg space-y-4 border border-[#122925] p-6 bg-[#C3C3C3] ">
                    <h1 className="text-2xl font-bold">Comece Agora!!</h1>
                    <p className="text-lg text-gray-700 font-semibold">
                        Insira seus dados:
                    </p>

                    <InputField
                        label="Nome completo"
                        type="text"
                        placeholder="Seu nome completo..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <InputField
                        label="Data de Nascimento"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <InputField
                        label="Saldo Atual"
                        type="number"
                        placeholder="Seu saldo atual..."
                        value={saldo}
                        onChange={(e) => setSaldo(e.target.value)}
                    />

                    <InputField
                        label="Número de telefone"
                        type="tel"
                        placeholder="Seu número..."
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />

                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Seu email .."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputField
                        label="Senha"
                        type="password"
                        placeholder="Sua senha..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputField
                        label="Confirme sua Senha"
                        type="password"
                        placeholder="Repita sua senha..."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Checkbox
                        label={
                            <>
                                Concordo com os{" "}
                                <a href="#" className="text-blue-600 underline hover:text-blue-800">
                                    termos de uso
                                </a>{" "}
                                e{" "}
                                <a href="#" className="text-blue-600 underline hover:text-blue-800">
                                    política de privacidade
                                </a>
                            </>
                        }
                        checked={agreeTerms}
                        onChange={setAgreeTerms}
                    />
                    <Link to="/" className="text-green-800 text-sm hover:underline">
                        Já tem conta? Entrar
                    </Link>

                    <Button text="Cadastrar" onClick={() => console.log("Cadastrado")} />
                </div>
            </div>
        </div>
    );
};

export default Cadastro;
