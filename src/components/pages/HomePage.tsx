import { gameInfo } from "../../types/games";
import { useNavigate } from "react-router-dom";
import TicTacToeIcon from '../../assets/tictactoe.webp';
import ConnectFourIcon from '../../assets/connectfour.webp'
import "./HomePage.css";

const HomePage = () => {
    const navigate = useNavigate();
    const games = [
        {name: "Tic Tac Toe", to: '/games/tic-tac-toe', gicon: 'https://sharp-dev-trev-public.s3.us-east-2.amazonaws.com/tictactoe.webp'},
        {name: "Connect 4", to: '/games/connect-4', gicon: 'https://sharp-dev-trev-public.s3.us-east-2.amazonaws.com/connectfour.webp'},
    ]
    return (
        <div className="game-section-page">
            <div className="games-area">
                {games.map((gameEntry:gameInfo)=>(
                    <div key={gameEntry.to} onClick={()=>navigate(gameEntry.to)} className={"game-card "+(gameEntry.className?gameEntry.className:'')}>
                        <h2>{gameEntry.name}</h2>
                        {gameEntry.gicon ? <img src={gameEntry.gicon} alt={"Image depicting "+gameEntry.name} style={{maxWidth: '200px'}}/> : ''}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default HomePage;