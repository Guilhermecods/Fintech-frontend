import { Link } from "react-router-dom";

const NavButtonHome = () => {
    const buttons = [
        { label: "Cartões", path: "/cartoes" },
        { label: "Perfil", path: "/perfil" },
        { label: "Adicionar", path: "/adicionar" },
    ];

    return (
        <div className="flex gap-2 mt-4">
            {buttons.map((b) => (
                <Link
                    key={b.label}
                    to={b.path}
                    className="bg-[#C3C3C3] text-gray-800 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
                >
                    {b.label}
                </Link>
            ))}
        </div>
    );
};

export default NavButtonHome;
