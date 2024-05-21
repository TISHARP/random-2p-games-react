import { useContext } from "react";
import DinoGameContext from "../../contexts/DinoGameContext";
import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "../../utils/interactiveCss";
import { dinoGameContext } from "../../types/games";
import { GROUND_SPEED, SPEED_MULT } from "../../utils/constants";

export const updateGround = (gameState: dinoGameContext, delta:number) => {
    const speedMult = Math.pow(SPEED_MULT,Math.floor(parseInt(gameState.score?gameState.score.innerText.substring(7):"0")/100))
    gameState.ground.forEach((ground)=>{
        incrementCustomProperty(ground, '--left',delta*speedMult*GROUND_SPEED*-1);
        if (getCustomProperty(ground, '--left') <= -300){
            incrementCustomProperty(ground, '--left', 600);
        }
    });
};
export const setupGround = (ground: HTMLImageElement[]) => {
    setCustomProperty(ground[0], '--left', 0);
    setCustomProperty(ground[1], '--left', 300);
}