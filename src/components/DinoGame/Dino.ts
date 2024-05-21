import { dinoGameContext } from "../../types/games"
import { DINO_FRAMES, DINO_FRAME_TIME, GRAVITY, JUMP_SPEED, SPEED_MULT } from "../../utils/constants";
import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "../../utils/interactiveCss";

export const setupDino = (gameState:dinoGameContext) => {
    gameState.isJumping = false;
    gameState.yVelocity = 0;
    if(gameState.dino) setCustomProperty(gameState.dino!, '--bottom', 0);
}

export const updateDino = (gameState:dinoGameContext, delta:number) => {
    handleRun(gameState, delta);
    handleJump(gameState, delta);
}

export function getDinoRect(gameState:dinoGameContext) {
    return gameState.dino!.getBoundingClientRect();
}
  
export function setDinoLose(gameState:dinoGameContext) {
    gameState.dino!.src = "/images/dino-lose.png"
}

let dinoFrame = 0;

const handleRun = (gameState:dinoGameContext, delta:number) => {
    if(gameState.isJumping || gameState.yVelocity>0) {
        if(gameState.dino)
            gameState.dino!.src = "/images/dino-stationary.png";
        return;
    }
    if (gameState.currentFrameTime >= DINO_FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAMES.length;
        gameState.dino!.src = DINO_FRAMES[dinoFrame];
        gameState.currentFrameTime = 0;
    }
    gameState.currentFrameTime += delta * Math.pow(SPEED_MULT, Math.floor(gameState.rawScore/100));

}

const handleJump = (gameState:dinoGameContext, delta:number) => {
    if(!gameState.isJumping) return
    incrementCustomProperty(gameState.dino!, '--bottom', gameState.yVelocity * delta);
    if(getCustomProperty(gameState.dino!, "--bottom")<0){
        setCustomProperty(gameState.dino!, '--bottom', 0);
        gameState.isJumping = false;
        gameState.yVelocity = 0;
        return;
    }
    gameState.yVelocity -= GRAVITY * delta;
}