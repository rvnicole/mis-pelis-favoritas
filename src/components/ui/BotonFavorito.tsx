import { HeartIcon } from "@heroicons/react/24/solid";
import { useStore } from "../../store/store";
import { Favoritos, Pelicula, PeliculaDetalles } from "../../types";

type BotonFavoritoProps = {
    pelicula: Pelicula | PeliculaDetalles;
    favorito: Favoritos;
}

export function BotonFavoritoShort({ pelicula }: Pick<BotonFavoritoProps, "pelicula">) {
    const favoritos = useStore(state => state.favoritos);
    const setFavoritos = useStore(state => state.setFavoritos);
    const esFavorito = favoritos.find(favorito => favorito.id === pelicula.id);

    const datos: Favoritos = {
        id: pelicula.id,
        title: pelicula.title,
        overview: pelicula.overview,
        backdrop_path: pelicula.backdrop_path
    }

    return (
        <button
            onClick={() => setFavoritos(datos)}
        >
            <HeartIcon className={`${esFavorito ? "text-red-600" : "text-slate-500"} size-7`}/>
        </button>
    )
}

export function BotonFavorito({ favorito }: Pick<BotonFavoritoProps, "favorito">) {
    const setFavoritos = useStore(state => state.setFavoritos);

    return (
        <button 
            className="flex align-middle items-center gap-2 px-3 py-1 self-end rounded-full hover:opacity-85"
            onClick={() => setFavoritos(favorito)}
        >
            <HeartIcon className="text-red-600 size-7"/>
        </button>
    )
}