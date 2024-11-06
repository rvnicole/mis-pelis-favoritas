import { StateCreator } from "zustand";
import { Favoritos } from "../types";
import { toast } from "react-toastify";

export type FavoritosSliceType = {
    favoritos: Favoritos[];
    setFavoritos: (pelicula: Favoritos) => void;
}

const favoritosLS = JSON.parse( localStorage.getItem("MIS_PELIS_FAVORITAS") || "[]") as Favoritos[];

export const favoritosSlice: StateCreator<FavoritosSliceType> = (set,get) => ({
    favoritos: favoritosLS,
    setFavoritos: (pelicula) => {
        const favoritos = get().favoritos.find(favorite => favorite.id === pelicula.id);

        if( favoritos?.id ) {
            const newFavoritos = get().favoritos.filter(favorito => favorito.id !== pelicula.id);

            set((state) => ({
                ...state,
                favoritos: [...newFavoritos]
            }));

            toast.info(`${pelicula.title} eliminada de tus peliculas favoritas`);
        }
        else {
            set(state => ({
                ...state,
                favoritos: [...get().favoritos, pelicula]
            }));

            toast.success(`${pelicula.title} agregada a tus peliculas favoritas`);
        }

        localStorage.setItem("MIS_PELIS_FAVORITAS", JSON.stringify( get().favoritos ));
    }    
});