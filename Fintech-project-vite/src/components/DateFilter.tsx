import { useState } from "react";
import { Search, Calendar } from "lucide-react";

interface DateFilterProps {
    date: string;
    onDateChange: (newDate: string) => void;
    onSearch: (query: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ date, onDateChange, onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    

    const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.value; // formato ISO (ex: 2025-04-11)
        if (!selected) return;
        onDateChange(selected); // passa a data ISO direto
    };

    return (
        <div className="flex flex-col items-center mt-6">
            <div className="bg-gray-200 rounded-2xl p-3 w-80 text-center shadow">
                <p className="text-gray-700 italic font-semibold">
                    {date ? new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : "Selecione uma data"}
                </p>

                <div className="flex items-center justify-between mt-2 bg-white rounded-full px-3 py-1 shadow-inner">
                    <Search className="w-5 h-5 text-gray-500" />

                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Pesquisar recebimento..."
                        className="flex-1 ml-2 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                    />

                    

                    <label className="relative cursor-pointer ml-3">
                        <Calendar className="w-5 h-5 text-gray-600 hover:text-green-600 transition" />
                        <input
                            type="date"
                            onChange={handleDateSelect}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DateFilter;
