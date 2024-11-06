import { z } from "zod";

export const PeliculaSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array( z.number() ).optional(),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number().optional(),
    poster_path: z.string().nullable(),
    release_date: z.string().optional(),
    title: z.string(),
    video: z.boolean().optional(),
    vote_average: z.number().optional(),
    vote_count: z.number().optional()
});

export const ResultadoAPISchema = z.object({
    page: z.number(),
    results: z.array( PeliculaSchema ),
    total_pages: z.number(),
    total_results: z.number()
});

export const FavoritosSchema = PeliculaSchema.pick({
    id: true,
    title: true,
    overview: true,
    backdrop_path: true
});

export const ColeccionSchema = z.object({
    id: z.number(),
    name: z.string(),
    poster_path: z.string(),
    backdrop_path: z.string()
}).nullable();

export const GenerpSchema = z.object({
    id: z.number(),
    name: z.string()
});

export const ProductoraSchema = z.object({
    id: z.number(),
    logo_path: z.string().optional().nullable(),
    name: z.string(),
    origin_country: z.string()
});
  
export const CiudadProduccionSchema = z.object({
    iso_3166_1: z.string(),
    name: z.string()
});
  
export const LenguajeSchema = z.object({
    english_name: z.string(),
    iso_639_1: z.string(),
    name: z.string()
});
  
export const PeliculaDetallesSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string(),
    belongs_to_collection: ColeccionSchema,
    budget: z.number(),
    genres: z.array(GenerpSchema),
    homepage: z.string(),
    id: z.number(),
    imdb_id: z.string(),
    origin_country: z.array(z.string()),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string(),
    production_companies: z.array(ProductoraSchema),
    production_countries: z.array(CiudadProduccionSchema),
    release_date: z.string(),
    revenue: z.number(),
    runtime: z.number(),
    spoken_languages: z.array(LenguajeSchema),
    status: z.string(),
    tagline: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number()
});

export const ColeccionPeliculasSchema = z.object({
    id: z.number(),
    name: z.string(),
    poster_path: z.string(),
    backdrop_path: z.string(),
    overview: z.string(),
    parts: z.array( PeliculaSchema )
});