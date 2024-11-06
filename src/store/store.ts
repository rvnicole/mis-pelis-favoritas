import { create } from "zustand";
import { paginaSlice, type PaginaSliceType } from "./paginaSlice";
import { favoritosSlice, type FavoritosSliceType} from "./favoritosSlice";

export const useStore = create<PaginaSliceType & FavoritosSliceType>((set, get, api) => ({
    ...paginaSlice(set, get, api),
    ...favoritosSlice(set, get, api)
}));