import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Recebimentos from "./pages/Recebimentos";
import Gastos from "./pages/Gastos";
import GerenciarBancos from "./pages/GerenciarBancos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/recebimentos" element={<Recebimentos />} />
        <Route path="/gastos" element={<Gastos />} />
        <Route path="/bancos" element={<GerenciarBancos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
