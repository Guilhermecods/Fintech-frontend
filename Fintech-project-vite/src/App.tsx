import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

function App() {
  return (

    <BrowserRouter >
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
