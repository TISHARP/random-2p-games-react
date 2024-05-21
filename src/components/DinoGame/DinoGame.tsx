import "./DinoGame.scss";
import { useEffect, useRef, useState } from "react";
import useAnimationFrame from "../../hooks/useAnimationFrame";
import useWinDims from "../../hooks/useWinDims";
import DinoGameContext from "../../contexts/DinoGameContext";
import { setupGround, updateGround } from "./Ground";
import { dinoGameContext } from "../../types/games";
import { setCustomProperty } from "../../utils/interactiveCss";
import useKeyDown from "../../hooks/useKeyDown";
import { updateScore } from "./Score";
import { getDinoRect, setupDino, updateDino } from "./Dino";
import { JUMP_SPEED } from "../../utils/constants";
import { getCactusRects, setupCactus, updateCactus } from "./Cactus";

let dinoGameStatus = 0;
let highScore = parseInt(localStorage.getItem("dino-game-highscore")||"0");

const DinoGame = () => {
    const [gameStatus, setGameStatus] = useState(0);
    const worldRef = useRef<HTMLDivElement>(null);
    const scoreRef = useRef<HTMLDivElement>(null);
    const groundsRef = useRef<HTMLImageElement[]>([]);
    const dinoRef = useRef<HTMLImageElement>(null);
    const startScreenRef = useRef<HTMLDivElement>(null);
    const winDims = useWinDims();
    let score = 0;
    const gameState = {
        winDims: winDims,
        world: worldRef.current,
        ground: groundsRef.current,
        cactus: [],
        dino: dinoRef.current,
        score: scoreRef.current,
        rawScore: score,
        isJumping: false,
        currentFrameTime: 0,
        yVelocity: 0
    } as dinoGameContext;
    const update = (delta: number) => {
        //if(gameState.score)
        //    gameState.score.innerText = "Score: "+(parseInt(gameState.score.innerText.substring(7))+Math.floor(delta));
        //if(dinoGameStatus!==1) return;
        console.log('b');
        updateGround(gameState, delta);
        updateScore(gameState, delta, gameStatus);
        updateDino(gameState, delta);
        updateCactus(gameState, delta);
        if (checkLose()) return handleLose();
        //setGameStatus(0);
    }
    const handleGameStart = (e:any)=>{
        if(dinoGameStatus!==1){
            setupGround(gameState.ground);
            setupDino(gameState);
            setupCactus();
            gameState.rawScore = 0;
            score = 0;
            if(gameState.score) gameState.score.innerText = "Score: 0";
            setGameStatus(1);
            dinoGameStatus = 1;
        } else{
            gameState.rawScore = 0;
        }
    }
    useEffect(()=>{
        setTimeout(()=>{
            handleGameStart(5);
        },50);
    },[]);

    useEffect((()=>{
        window.addEventListener("keydown",onJump);
        return () => window.removeEventListener("keydown", onJump)
    }))
    const onJump = (e:any) => {
        if(e.key!==" ") return;
        if(gameState.isJumping) return;
        gameState.yVelocity = JUMP_SPEED;
        gameState.isJumping = true;
    }
    function checkLose() {
        const dinoRect = getDinoRect(gameState);
        return getCactusRects().some((rect:any) => isCollision(rect, dinoRect))
    }
      
    function isCollision(rect1:any, rect2:any) {
        return (
          rect1.left < rect2.right-5 &&
          rect1.top < rect2.bottom-5 &&
          rect1.right > rect2.left+5 &&
          rect1.bottom > rect2.top+5
        )
      }
    const handleLose = () => {
        dinoGameStatus = 2;
        setGameStatus(2);
        setCustomProperty(gameState.dino!, '--bottom', 0);
        if(parseInt(localStorage.getItem("dino-game-highscore")||"0")<Math.floor(gameState.rawScore)){
            localStorage.setItem("dino-game-highscore", Math.floor(gameState.rawScore).toString());
            highScore = Math.floor(gameState.rawScore);
        }
        gameState.rawScore = 0;
        window.location.reload();
      }
    useAnimationFrame(update, gameStatus);
    //Setup initial game states.
    return (
        <DinoGameContext.Provider value={gameState}>
        <div ref={worldRef} className="world" style={{height: winDims.w/4}}>
            <div className="highscore">High Score: {highScore}</div>
            <div ref={scoreRef} className="score">Score: 0</div>
            <img ref={(el:HTMLImageElement) => (groundsRef.current[0] = el)} src={"/images/ground.png"} className="ground" />
            <img ref={(el:HTMLImageElement) => (groundsRef.current[1] = el)} src={"/images/ground.png"} className="ground" />
            <img ref={dinoRef} src={"/images/dino-stationary.png"} className="dino" />
            {gameState.cactus.map((c)=>c as any)
            }
        </div>
        </DinoGameContext.Provider>
    )
}

export default DinoGame;