import { ColeccionPeliculas, PeliculaDetalles } from "../types"
import CardMovie from "./CardMovie";

type CollectionMoviesProps = {
    coleccion: ColeccionPeliculas;
    peliculaID: PeliculaDetalles['id'];
}

export default function CollectionMovies({coleccion, peliculaID}: CollectionMoviesProps) {
    const peliculas = coleccion.parts.filter(pelicula => pelicula.id !== peliculaID);
    
    return (
        <div>
            <div className="grid grid-cols-3 items-center my-10">
                <hr className="border-slate-600"/>
                <p className="text-center text-white font-semibold">Parte de la colección</p>
                <hr className="border-slate-600"/>
            </div>

            <div className="grid gap-7 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                { peliculas.map(pelicula => (
                    <CardMovie key={pelicula.id} pelicula={pelicula}/>
                ))}
            </div>
        </div>
    )
}