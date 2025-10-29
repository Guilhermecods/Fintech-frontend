import logo from '../assets/img/logo.png'
export default function Navbar() {
    return (
        <nav className="bg-[#122925] flex justify-between items-center px-6 py-3">
            <div className="text-white text-xl font-semibold flex items-center gap-2">
                <img src={logo} alt="" width={60}/>
            </div>
            <button className="text-white text-2xl">&#9776;</button>
        </nav>
    );
}
