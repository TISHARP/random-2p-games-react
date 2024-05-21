import { createContext } from "react";
import { dinoGameContext } from "../types/games";

const DinoGameContext = createContext({
    winDims: {
        w: 0,
        h: 0,
    },
    world: null,
    ground: [],
    cactus: [],
    dino: null,
    score: null,
    rawScore: 0,
    isJumping: false,
    currentFrameTime: 0,
    yVelocity: 0
} as dinoGameContext);

export default DinoGameContext;