export interface gameInfo{
    name: string,
    to: string,
    gicon: null|string,
    className?: string
}
export interface dinoGameContext{
    winDims: {
        w: number,
        h: number
    },
    world: HTMLDivElement|null,
    ground: HTMLImageElement[],
    cactus: HTMLImageElement[],
    dino: HTMLImageElement|null,
    score: HTMLDivElement|null,
    rawScore: number,
    isJumping: boolean,
    currentFrameTime: number,
    yVelocity: number
}