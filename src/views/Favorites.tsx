import CardFavorite from "../components/CardFavorite";
import { useStore } from "../store/store"

export default function Favorites() {
    const favoritos = useStore(state => state.favoritos);

    return (
        <div className="flex flex-col gap-6 items-center p-5 mt-20">
            { favoritos.map(pelicula => 
                <CardFavorite key={pelicula.id} pelicula={pelicula}/>
            )}
        </div>
    )
}