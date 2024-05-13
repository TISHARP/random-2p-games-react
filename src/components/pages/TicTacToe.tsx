import { useState } from "react";
import "./TicTacToe.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const gameState = (game: number[]) => {
    const isTopRow = game[0]&&game[0]===game[1]&&game[0]===game[2];
    const isMidRow = game[3]&&game[3]===game[4]&&game[3]===game[5];
    const isLowRow = game[6]&&game[6]===game[7]&&game[6]===game[8];
    const isTopCol = game[0]&&game[0]===game[3]&&game[0]===game[6];
    const isMidCol = game[1]&&game[1]===game[4]&&game[1]===game[7];
    const isLowCol = game[2]&&game[2]===game[5]&&game[2]===game[8];
    const isMainDiag = game[0]&&game[0]===game[4]&&game[0]===game[8];
    const isSecDiag = game[2]&&game[2]===game[4]&&game[2]===game[6];
    if(isTopRow||isTopCol||isMainDiag){
        return game[0];
    } else if(isMidRow||isMidCol||isSecDiag){
        return game[4];
    } else if(isLowRow||isLowCol){
        return game[8];
    }
    let isFilled = true;
    for(let i = 0; i < 3; i+=1){
        if(game[i]===0||game[i+3]===0||game[i+6]===0) isFilled = false;
    }
    if(isFilled) return 2;
    return 0;
}

const TicTacToe = () => {
    const [turn, setTurn] = useState(true);
    const [game, setGame] = useState([0,0,0,0,0,0,0,0,0]);
    const vSpot = ("variable-slot-"+(turn?'x':'o'));
    const state = gameState(game);
    const navigate = useNavigate();
    const handleTake = (idx:number) => () => {
        if(state!==0) return
        const t = [...game]
        t.splice(idx,1,turn?1:-1);
        setGame(t);
        setTurn(!turn);
    }
    const handleReset = () => {
        setGame([0,0,0,0,0,0,0,0,0]);
        setTurn(true);
    }
    const handleHome = () => {
        navigate('/');
    }
    return (
        <div className="tic-tac-toe-page">
            {state===0?(<p>Player {turn?"X":"O"}'s Turn</p>):state===1?(<p>Player X Wins!</p>):state===-1?(<p>Player O Wins!</p>):(<p>It's a Tie!</p>)}
            <div className="board">
                {game.map((v:number,idx:number)=>(
                    <div 
                        className={"board-slot "+(v===1?"x-slot":v===-1?"o-slot":(state===0?vSpot:''))} 
                        key={idx} 
                        onClick={handleTake(idx)}
                    ></div>
                ))}
            </div>
            <Button variant="outlined" sx={{minWidth: 260, margin: '3px'}} onClick={handleReset}>Restart Game</Button>
            <Button variant="outlined" sx={{minWidth: 260, margin: '3px'}} onClick={handleHome}>Choose Another Game</Button>
        </div>
    )
}

export default TicTacToe;