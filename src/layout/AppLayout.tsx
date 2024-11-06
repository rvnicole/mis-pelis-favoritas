import { HeartIcon, HomeIcon } from "@heroicons/react/24/solid";
import SearchBar from "../components/SearchBar";
import { useStore } from "../store/store";
import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
    const paginaActual = useStore(state => state.paginaActual);
    const setPaginaActual = useStore(state => state.setPaginaActual);

    return (
        <div className="absolute bg-[url('/fondo-collage-peliculas.jpg')] bg-cover bg-center h-16 w-full">
            <div className="z-50 fixed top-0 w-full flex justify-between items-center bg-slate-950/60 backdrop-blur-lg p-5">
                
                <h1 className="md:text-xl text-lg font-bold text-white">
                    <Link to="/" onClick={() => setPaginaActual("/")}>Mis Pelis Favoritas</Link>
                </h1>

                <SearchBar />

                <div className="flex gap-2 md:gap-10 justify-end">
                    <Link 
                        to="/" 
                        className={`${paginaActual === "/" ? "border-b-2 border-sky-500	" : "border-none"} text-white font-semibold px-3 py-1`}
                        onClick={() => setPaginaActual("/")}
                    >
                        <HomeIcon className="md:hidden size-7"/>
                        <p className="md:block hidden">Inicio</p>
                    </Link>

                    <Link 
                        to="/favorites"
                        className={`${paginaActual === "/favorites" ? "border-b-2 border-sky-500	" : "border-none"} text-white font-semibold px-3 py-1`}
                        onClick={() => setPaginaActual("/favorites")}
                    >
                        <HeartIcon className="md:hidden size-7"/>
                        <p className="md:block hidden">Favoritas</p>
                    </Link>
                </div>
            </div> 
            
            <div>
               <Outlet/> 
            </div>         
        </div>
    )
}