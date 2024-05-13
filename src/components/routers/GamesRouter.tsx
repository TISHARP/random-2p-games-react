import { Routes, Route } from "react-router-dom";
import TicTacToe from "../pages/TicTacToe";
import PageNotFound from "../pages/PageNotFound";

const GamesRouter = () => {
    return (
        <Routes>
            <Route path="tic-tac-toe" element={<TicTacToe />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default GamesRouter;