import { dinoGameContext } from "../../types/games";
import { SCORE_PER_SECOND, SPEED_MULT } from "../../utils/constants";


export const updateScore = (gameState: dinoGameContext, delta: number, gameStatus: number) => {
    //Do something
    if(gameStatus!==1) return;
    if(!gameState.score) return;
    gameState.rawScore+=((delta/1000)*SCORE_PER_SECOND)*Math.pow(SPEED_MULT, Math.floor(gameState.rawScore/100));
    gameState.score!.innerText = "Score: "+Math.floor(gameState.rawScore);
}