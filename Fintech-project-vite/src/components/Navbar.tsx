import logo from '../assets/img/logo.png'
export default function Navbar() {
    return (
        <nav className="bg-[#122925] flex justify-center items-center px-6 py-3">
            
            <div className="text-white text-xl font-semibold flex items-center gap-2">
                <img src={logo} alt="" width={100} />
            </div>
        
        </nav>
    );
}
