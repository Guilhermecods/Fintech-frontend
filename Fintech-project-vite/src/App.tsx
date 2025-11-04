import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Investimento from "./pages/Investimento";

function App() {
  return (

    <BrowserRouter >
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/investimento" element={<Investimento />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
