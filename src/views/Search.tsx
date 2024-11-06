import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { Pelicula } from "../types";
import { searchMovieByTitle } from "../api/movieAPI";
import CardMovie from "../components/CardMovie";
import Spinner from "../components/ui/Spinner";

export default function Search() {
    const [peliculas, setPeliculas] = useState<Pelicula []>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [cargando, setCargando] = useState(true);

    const page = useRef(0);
    const spinner = useRef<HTMLDivElement>(null);
    
    const params = useParams();
    const title = params.title!;

    const obtenerPeliculas = async (pageToFetch: number) => {  
        console.log("Page to Fetch", pageToFetch);      
        const data = await searchMovieByTitle(title, pageToFetch);

        if (data) {
            console.log("Data", data);

            const nuevasPeliculas = data.results.filter( (nuevaPelicula) => {
                return !peliculas.some((pelicula) => pelicula.id === nuevaPelicula.id)
            });

            setPeliculas(p => [...p, ...nuevasPeliculas]);
            setTotalPage(data.total_pages);
        }  
        
        setCargando(false);
    };

    useEffect(() => {        
        const observador = new IntersectionObserver(items => {
                if(items[0].isIntersecting && (totalPage > page.current || page.current === 1)) {
                    if( !cargando ) {
                        console.log("Cargar mas resultados");
                        page.current = page.current + 1;
                        setCargando(true);
                    }
                }
            }
        );

        if(spinner.current) {
            observador.observe( spinner.current );
        }

        return () => {
            if (spinner.current) {
                observador.unobserve(spinner.current);
            }
        };
    });

    useEffect(() => {
        console.log("Cambio Page", page.current);
        obtenerPeliculas(page.current);
    }, [page.current]);

    useEffect(() => {
        console.log("Cambio", title);

        setPeliculas([]);
        setTotalPage(0);
        page.current = 0;
        setCargando(false);
    }, [title]);

    if(title) return (
        <div className="mt-20">
            <div className="grid gap-7 p-5 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                { peliculas.map(pelicula => (
                    <CardMovie key={pelicula.id} pelicula={pelicula}/>
                ))}
            </div>
            

            { page.current < totalPage ? 
                    <div ref={spinner}> <Spinner /> </div>
                :   <div><p className="text-center text-white text-sm">Son todos los resultados</p></div>
            }
        </div>
    )
}