import React, { useState, type FormEvent } from "react";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ToggleSwitch from "../components/ToogleSwitch";
import { Link, useNavigate } from "react-router-dom";
import { doLogin } from "@/shared/core/auth/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await doLogin(email, password);
      navigate("/home");
    } catch (error) {
      alert("Erro ao fazer login. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col bg-[#122925] ">
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-5 px-7  ">
        <div className="w-full max-w-sm rounded-lg space-y-5 border border-[#122925] p-6 bg-[#C3C3C3]">
          <h1 className="text-2xl font-bold">Bem-vindo de Volta</h1>
          <p className="text-sm text-gray-700 font-semibold">
            Acesse sua conta{" "}
          </p>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              placeholder="Seu email ..."
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
            <div className="flex flex-col mt-3">
              <Link
                to="/cadastro"
                className="text-green-800 text-sm hover:underline"
              >
                Cadastrar agora
              </Link>

              <a href="#" className="text-green-800 text-sm">
                Esqueci minha senha...
              </a>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm">Lembre-me</span>
              <ToggleSwitch
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
            </div>
            <Button text="ENTRAR" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
