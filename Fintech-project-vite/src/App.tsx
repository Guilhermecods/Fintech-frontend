import React, { useState } from "react";

import Navbar from "./components/Navbar";
import InputField from "./components/InputField";
import Button from "./components/Button";
import ToggleSwitch from "./components/ToogleSwitch";



const App: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  



  return (
    <div className="min-h-screen  flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 px-6">
        <div className="w-full max-w-sm rounded-lg space-y-4">
          <h1 className="text-2xl font-bold">Bem-vindo de Volta</h1>
          <p className="text-sm text-gray-700 font-semibold">Acesse sua conta </p>

          <InputField
            label="CPF"
            type="text"
            placeholder="Seu CPF completo..."
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <InputField
            label="Senha"
            type="password"
            placeholder="Sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <a href="#" className="text-green-800 text-sm">
            Esqueci minha senha...
          </a>

          <Button text="ENTRAR" onClick={()=>console.log("Click")} />

          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">Lembre-me</span>
            <ToggleSwitch
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
