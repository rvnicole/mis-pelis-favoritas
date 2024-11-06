import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import AppLayout from "./layout/AppLayout";
import Favorites from "./views/Favorites";
import Movie from "./views/Movie";
import Search from "./views/Search";
import NotFound from "./views/NotFound";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} index/>
                    <Route path="/favorites" element={<Favorites />}/>
                    <Route path="/movie/:id" element={<Movie />}/>
                    <Route path="/search/:title" element={<Search/>}/>
                </Route> 

                <Route element={<AppLayout />}>
                    <Route path="/*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}