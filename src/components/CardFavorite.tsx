import { Link } from "react-router-dom"
import { Favoritos } from "../types"
import { BotonFavorito } from "./ui/BotonFavorito"

type CardFavoriteProps = {
    pelicula: Favoritos
}

export default function CardFavorite({ pelicula }: CardFavoriteProps) {
    return (
        <div className="flex gap-3 items-center md:flex-row flex-col lg:w-[70vw] md:w-[80vw] sm:w-full bg-slate-950 border border-slate-800  p-2 rounded-lg hover:scale-[1.009] hover:transition-all hover:duration-300">
            <Link to={`/movie/${pelicula.id}`} className="relative group">
                <img src={`https://image.tmdb.org/t/p/w500${pelicula.backdrop_path}`}
                    className="rounded-lg md:w-72 w-full transition-all duration-300 group-hover:brightness-50"
                    height="auto"
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold">Ver detalles</span>
                </div>
            </Link>

            <div className="flex flex-col gap-3 p-1 w-full">
                <p className="text-white text-xl font-bold">
                    <Link to={`/movie/${pelicula.id}`}>{pelicula.title}</Link>
                </p>
                <p className="text-sm text-white">{pelicula.overview.substring(0, 100)}...</p> 
                <BotonFavorito favorito={pelicula} />
            </div>
            
        </div>
    )
}