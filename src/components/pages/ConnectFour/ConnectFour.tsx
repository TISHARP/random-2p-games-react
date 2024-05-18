import { useState } from "react";
import "./ConnectFour.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// columns are stored in matrix rows.
const gameState = (game: number[][]) => {
    //Check for vertical wins
    console.log('a');
    for(let i = 0; i < game.length-3; i+=1){
        for(let j = 0; j < game[0].length; j+=1){
            if(game[i][j]!==0&&game[i][j]===game[i+1][j]&&game[i][j]===game[i+2][j]&&game[i][j]===game[i+3][j]){
                return game[i][j]
            }
        }
    }
    console.log('b');
    //Check for horizontal wins
    for(let j = 0; j < game[0].length-3; j+=1){
        for(let i = 0; i < game.length; i+=1){
            if(game[i][j]!==0&&game[i][j]===game[i][j+1]&&game[i][j]===game[i][j+2]&&game[i][j]===game[i][j+3]){
                return game[i][j]
            }
        }
    }
    console.log('c');
    //Check for main diagonal wins
    for(let i = 3; i < game[0].length; i+=1){
        for(let j = 3; j < game.length; j+=1){
            if(game[i][j]!==0&&game[i][j]===game[i-1][j-1]&&game[i][j]===game[i-2][j-2]&&game[i][j]===game[i-3][j-3]){
                return game[i][j]
            }
        }
    }
    console.log('d');
    //Check for secondary diagonal wins
    for(let i = 3; i < game[0].length; i+=1){
        for(let j = 0; j < game.length-3; j+=1){
            if(game[i][j]!==0&&game[i][j]===game[i-1][j+1]&&game[i][j]===game[i-2][j+2]&&game[i][j]===game[i-3][j+3]){
                return game[i][j]
            }
        }
    }
    console.log('e');
    //Check if the board is filled
    for(let i = 0; i < game.length; i+=1){
        console.log(game[i][0])
        if(game[i][0]===0) return 0
    }
    console.log('f');
    //If board was filled then return 2 as it is a tie.
    return 2;
}

const ConnectFour = () => {
    const [turn, setTurn] = useState(true);
    const [game, setGame] = useState([[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]);
    const vSpot = ("variable-slot-"+(turn?'r':'y'));
    const state = gameState(game);
    const navigate = useNavigate();
    const handleTake = (idx:number) => () => {
        if(state!==0) return
        if(game[idx][0]!==0) return
        let t = [...game]
        let c = 0;
        for(let i = game[idx].length-1; i >=0;i-=1){
            if(game[idx][i]===0){
                c = i;
                break;
            }
        }
        t[idx].splice(c,1,turn?1:-1);
        setGame(t);
        setTurn(!turn);
    }
    const handleReset = () => {
        setGame([[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]);
        setTurn(true);
    }
    const handleHome = () => {
        navigate('/');
    }
    return (
        <div className="connect-four-page">
            {state===0?(<p>{turn?"Red":"Yellow"}'s Turn</p>):state===1?(<p>Player Red Wins!</p>):state===-1?(<p>Player Yellow Wins!</p>):(<p>It's a Tie!</p>)}
            <div className="board">
                {game.map((col:number[],idx:number)=>(
                    <div key={idx} className="column" onClick={handleTake(idx)}>
                        {col.map((v:number, vidx: number)=>(
                            <div 
                                className={"board-slot "+(v===1?"r-slot":v===-1?"y-slot":(state===0?vSpot:''))} 
                                key={vidx} 
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
            <Button variant="outlined" sx={{minWidth: 260, margin: '3px'}} onClick={handleReset}>Restart Game</Button>
            <Button variant="outlined" sx={{minWidth: 260, margin: '3px', marginBottom: '93px'}} onClick={handleHome}>Choose Another Game</Button>
        </div>
    )
}

export default ConnectFour;