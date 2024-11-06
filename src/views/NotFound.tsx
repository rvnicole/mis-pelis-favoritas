import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="mt-40 text-center">
            <p className="text-5xl font-bold text-white uppercase">OOPS!</p>
            <p className="text-xl font-semibold text-white uppercase">Página No Encontrada</p>
            <p className="text-8xl font-bold text-sky-500 uppercase">404</p>
            <Link
                className="inline-block m-5 px-5 py-2 bg-sky-500 text-white font-semibold rounded-full hover:opacity-90"
                to="/"
            >
                Volver al Inicio
            </Link>
        </div>
    )
}