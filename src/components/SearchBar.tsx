import { useState, ChangeEvent, FormEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SearchBar() {
    const [consulta, setConsulta] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;

        if( valor ){
           setConsulta(valor); 
        }        
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if( !consulta ) {
            toast.warning("Ingresa el nombre de la pelicula que estas buscando");
           return; 
        }
        
        navigate(`/search/${consulta}`); 
    }

    return (
        <form 
            className="relative"
            onSubmit={handleSubmit}
        >
            <input 
                className="text-white lg:w-96 md:w-80 w-full py-2 px-3 rounded-full bg-slate-700 focus:outline-sky-500"
                placeholder="Buscar"
                type="text"
                onChange={handleChange}
            />

            <button 
                className="absolute right-1 top-1 bg-sky-500 rounded-full p-2 m-0 hover:opacity-90"
                type="submit"
            >
                <MagnifyingGlassIcon className="text-white size-4"/>
            </button>
        </form>
    )
}