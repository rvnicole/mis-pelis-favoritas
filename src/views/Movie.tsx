import { useParams } from "react-router-dom";
import { getMovieCollection, getMovieDetails } from "../api/movieAPI";
import { ColeccionPeliculas, PeliculaDetalles } from "../types";
import { useEffect, useState } from "react";
import ScalePopularityMovie from "../components/ui/ScalePopularityMovie";
import { formatDate, formatDuration } from "../lib/date";
import CollectionMovies from "../components/CollectionMovies";
import { ClockIcon } from "@heroicons/react/24/outline";
import { BotonFavoritoShort } from "../components/ui/BotonFavorito";
import { useStore } from "../store/store";

async function obtenerDetallesPelicula(id: PeliculaDetalles['id']) {
    const respuesta = await getMovieDetails(id);
    return respuesta;
}

export default function Movie() {
    const setPaginaActual = useStore(state => state.setPaginaActual);
    const [pelicula, setPelicula] = useState<PeliculaDetalles>();
    const [coleccion, setColeccion] = useState<ColeccionPeliculas>();

    const params = useParams();
    const id = parseInt(params.id!);

    useEffect(() => {
        const fetchColeccion = async (id: number) => {
            const data = await getMovieCollection(id);
            setColeccion(data);
        };

        const fetchPelicula = async () => {
            const data = await obtenerDetallesPelicula(id);
            setPelicula(data);

            if( data?.belongs_to_collection ) {
                fetchColeccion(data.belongs_to_collection.id);
            }
        };

        fetchPelicula();
        setPaginaActual("")
    }, [id]);
    
    if(pelicula) return (
        <div className="mt-20 p-5">
            <div className="p-5 flex-col justify-between gap-5 bg-slate-950 border border-slate-800 rounded-lg">
                <div className="flex md:flex-row flex-col gap-5">
                    <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                        className="rounded-lg object-contain self-start sm:w-full md:w-[220px]"
                    />

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-white md:text-3xl text-2xl font-bold">{pelicula.title}</p>

                                <div className="flex md:gap-10 md:flex-row flex-col">
                                    <p className="text-slate-400 text-sm">Estreno: {formatDate(pelicula.release_date)}</p>
                                    <p className="flex gap-1 text-slate-400 text-sm">
                                        <ClockIcon className="size-5"/> 
                                        {formatDuration(pelicula.runtime)}
                                    </p>
                                </div> 
                            </div>
                            
                            <div className="self-start m-1">
                                <BotonFavoritoShort pelicula={pelicula}/>  
                            </div>
                        </div>

                        <ScalePopularityMovie popularity={pelicula.vote_average}/>

                        <div className="grid grid-cols-3 md:flex gap-2">
                            <p className="text-slate-400 text-sm">Genero:</p>
                            { pelicula.genres.map(genero => (
                                <div key={genero.id} className={`${genero.name.length > 10 && "col-span-2"} border border-slate-600 rounded-full px-2`}>
                                    <p className="text-slate-400 text-sm text-center">{genero.name}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="md:w-[95%]">
                            <p className="text-slate-400">Descripción:</p>
                            <p className="text-white">{pelicula.overview}</p>
                        </div>

                    </div>
                </div>
            </div>

            { coleccion && <CollectionMovies coleccion={coleccion} peliculaID={pelicula.id}/>}
        </div>
    )
}