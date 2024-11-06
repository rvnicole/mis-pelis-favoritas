import { z } from "zod";
import { ColeccionPeliculasSchema, ColeccionSchema, FavoritosSchema, PeliculaDetallesSchema, PeliculaSchema } from "../schemas";

export type Pelicula = z.infer<typeof PeliculaSchema>;
export type Favoritos = z.infer<typeof FavoritosSchema>;
export type PeliculaDetalles = z.infer<typeof PeliculaDetallesSchema>;
export type Coleccion = z.infer<typeof ColeccionSchema>;
export type ColeccionPeliculas = z.infer<typeof ColeccionPeliculasSchema>;