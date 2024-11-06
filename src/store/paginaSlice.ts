import { StateCreator } from "zustand";

export type PaginaSliceType = {
    paginaActual: string;
    setPaginaActual: (pagina: string) => void;
}

export const paginaSlice: StateCreator<PaginaSliceType> = (set) => ({
    paginaActual: location.pathname as string,
    setPaginaActual: (pagina) => {
        set(state => ({
            ...state,
            paginaActual: pagina
        }));
    }  
});