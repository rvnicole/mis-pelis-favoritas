import { Link } from "react-router-dom";
import { Pelicula } from "../types"
import { BotonFavoritoShort } from "./ui/BotonFavorito";
import ScalePopularityMovie from "./ui/ScalePopularityMovie";

type CardMovieProps = {
    pelicula: Pelicula;
}

export default function CardMovie({ pelicula }: CardMovieProps) {
    return (
        <div>
            <div className="flex gap-3 items-center bg-slate-950 border border-slate-800 p-2 rounded-lg hover:scale-[1.01] hover:transition-all hover:duration-300">
                <Link to={`/movie/${pelicula.id}`} className="relative group">
                    <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt="Imagen de la palícula"
                        className="rounded-lg transition-all duration-300 group-hover:brightness-50 text-slate-800"
                        width="150px"
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg font-semibold">Ver detalles</span>
                    </div>
                </Link>

                <div className="flex flex-col justify-between w-3/4 md:h-48 space-y-3">
                    <p className="text-white md:text-xl font-bold">
                        <Link to={`/movie/${pelicula.id}`}>{pelicula.title.length > 45 ? pelicula.title.substring(0, 45) + "..." : pelicula.title}</Link>
                    </p>
                    <ScalePopularityMovie popularity={pelicula.vote_average ? pelicula.vote_average : 0}/>
                    <p className="text-sm text-white">{pelicula.overview.substring(0, 70)}...</p>
                    <div className="self-end mx-3">
                        <BotonFavoritoShort pelicula={pelicula}/>
                    </div>
                </div>
            </div>
        </div>
    )
}