import { useEffect, useRef, useState } from "react";
import { getPopularMovies } from "../api/movieAPI"
import CardMovie from "../components/CardMovie";
import Spinner from "../components/ui/Spinner";
import { Pelicula } from "../types";

export default function Home() {
    const [peliculas, setPeliculas] = useState<Pelicula []>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [cargando, setCargando] = useState(true);
    
    const page = useRef(0);
    const spinner = useRef<HTMLDivElement>(null);
   
    const obtenerPeliculas = async (pageToFetch: number) => {  
        console.log("Page to Fetch", pageToFetch);      
        const data = await getPopularMovies(pageToFetch);

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
                if(items[0].isIntersecting && (totalPage > page.current || page.current === 1 )) {
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
    
    if( peliculas ) return (
        <div className="mt-20">

            <div className="flex flex-col justify-center items-center p-10">
                <h1 className="text-white text-3xl font-bold">Selecciona tus películas favoritas</h1>
                <p className="text-sky-500 font-semibold italic">Explora y añade a tu lista las películas que te han cautivado</p>
            </div>

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