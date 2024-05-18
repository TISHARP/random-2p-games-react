import { Routes, Route } from "react-router-dom";
import TicTacToe from "../pages/TicTacToe/TicTacToe";
import PageNotFound from "../pages/PageNotFound";
import ConnectFour from "../pages/ConnectFour/ConnectFour";

const GamesRouter = () => {
    return (
        <Routes>
            <Route path="tic-tac-toe" element={<TicTacToe />} />
            <Route path="connect-4" element={<ConnectFour />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default GamesRouter;