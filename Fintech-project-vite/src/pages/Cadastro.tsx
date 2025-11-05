import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Checkbox from "../components/CheckBox";
import { Link, useNavigate } from "react-router-dom";
import { doRegister } from "@/shared/core/auth/auth";
import type { Authentication, UserInfo } from "@/shared/@types/auth";

const Cadastro: FC = () => {
  const [form, setForm] = useState<UserInfo & Authentication>({
    email: "",
    senha: "",
    ativo: "",
    vlSaldo: 0,
    nmUsuario: "",
    nrTelefone: "",
    dtNascimento: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert(
        "Você deve concordar com os termos de uso e política de privacidade"
      );
      return;
    }
    if (form.senha !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    try {
      await doRegister(form);
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      alert("Erro ao realizar cadastro. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#122925]">
      <Navbar />
      <form onSubmit={handleSubmit}>
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
              value={form.nmUsuario}
              name="nmUsuario"
              onChange={handleChange}
            />

            <InputField
              label="Data de Nascimento"
              type="date"
              value={form.dtNascimento}
              name="dtNascimento"
              onChange={handleChange}
            />

            <InputField
              label="Saldo Atual"
              type="number"
              placeholder="Seu saldo atual..."
              value={form.vlSaldo}
              name="vlSaldo"
              onChange={handleChange}
            />

            <InputField
              label="Número de telefone"
              type="tel"
              placeholder="Seu número..."
              value={form.nrTelefone}
              name="nrTelefone"
              onChange={handleChange}
            />

            <InputField
              label="Email"
              type="email"
              placeholder="Seu email .."
              value={form.email}
              name="email"
              onChange={handleChange}
            />

            <InputField
              label="Senha"
              type="password"
              placeholder="Sua senha..."
              value={form.senha}
              name="senha"
              onChange={handleChange}
            />

            <InputField
              label="Confirme sua Senha"
              type="password"
              placeholder="Repita sua senha..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
            />

            <Checkbox
              label={
                <>
                  Concordo com os{" "}
                  <a
                    href="#"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    termos de uso
                  </a>{" "}
                  e{" "}
                  <a
                    href="#"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
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

            <Button
              type="submit"
              text="Cadastrar"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
