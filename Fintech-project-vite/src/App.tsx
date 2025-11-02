import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (

    <BrowserRouter >
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/perfil" element={<Profile/>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
