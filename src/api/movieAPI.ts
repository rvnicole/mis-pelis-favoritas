import { ColeccionPeliculasSchema, PeliculaDetallesSchema, ResultadoAPISchema } from "../schemas";
import type { PeliculaDetalles } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY_TMBD;
const baseURL = "https://api.themoviedb.org/3";

export async function getPopularMovies(page: number) {
    try {
        if(page === 0) {
            return {
                results: [],
                total_pages: 1
            }
        }

        const resultados = await fetch(`${baseURL}/movie/popular?api_key=${API_KEY}&language=es-MX&page=${page}`);
        const datos = await resultados.json();

        const { success, data, error} = ResultadoAPISchema.safeParse(datos);

        if( success ) {
            return data;
        }
        else {
            error.issues.forEach( issue => console.log(issue));
        }
    }
    catch(error) {
        console.log(error);
    }
}

export async function getMovieDetails(id: PeliculaDetalles['id']) {
    try {
        const resultados = await fetch(`${baseURL}/movie/${id}?api_key=${API_KEY}&language=es-MX`);
        const datos = await resultados.json();

        const {success, data, error} = PeliculaDetallesSchema.safeParse(datos);

        if( success ) {
            return data;
        }
        else {
            error.issues.forEach( issue => console.log(issue));
        }
    }
    catch(error) {
        console.log(error);
    }
}

export async function getMovieCollection(id: number) {
    try {
        const resultados = await fetch(`${baseURL}/collection/${id}?api_key=${API_KEY}&language=es-MX`);
        const datos = await resultados.json();

        const {success, data, error} = ColeccionPeliculasSchema.safeParse(datos);

        if( success ) {
            return data;
        }
        else {
            error.issues.forEach( issue => console.log(issue));
        }
    }
    catch(error) {
        console.log(error);
    }
}

export async function searchMovieByTitle(title: string, page: number) {
    try {
        if(page === 0) {
            return {
                results: [],
                total_pages: 1
            }
        }
        
        const resultados = await fetch(`${baseURL}/search/movie?api_key=${API_KEY}&query=${title}&page=${page}&language=es-MX`);
        const datos = await resultados.json();

        const {success, data, error} = ResultadoAPISchema.safeParse(datos);

        if( success ) {
            return data;
        }
        else {
            error.issues.forEach( issue => console.log(issue));
        }
    }
    catch(error) {
        console.log(error);
    }
}