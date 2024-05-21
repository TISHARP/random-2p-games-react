import { createElement } from "react";
import { dinoGameContext } from "../../types/games"
import { CACTUS_INTERVAL_MAX, CACTUS_INTERVAL_MIN, GROUND_SPEED, SPEED_MULT } from "../../utils/constants"
import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "../../utils/interactiveCss"
  let nextCactusTime = 0;
  export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN;
    document.querySelectorAll(".cactus").forEach(cactus => {
      cactus.remove();
    })
  }
  
  export function updateCactus(gameState:dinoGameContext, delta:number) {
    const speedMult = Math.pow(SPEED_MULT,Math.floor(parseInt(gameState.score?gameState.score.innerText.substring(7):"0")/100))
    document.querySelectorAll('.cactus').forEach((cactus:any) => {
        incrementCustomProperty(cactus, '--left',delta*speedMult*GROUND_SPEED*-1);
      if (getCustomProperty(cactus, "--left") <= -100) {
        cactus.remove();
      }
    })
  
    if (nextCactusTime <= 0) {
      createCactus(gameState);
      const speedMult = Math.pow(SPEED_MULT,Math.floor(parseInt(gameState.score?gameState.score.innerText.substring(7):"0")/100))
      nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedMult;
    }
    nextCactusTime -= delta;
  }
  
  export function getCactusRects() {
    return [...document.querySelectorAll(".cactus") as any].map((cactus:any) => {
      return cactus.getBoundingClientRect();
    })
  }
  
  function createCactus(gameState: dinoGameContext) {
    const cactus = document.createElement("img");
    cactus.src = "/images/cactus.png";
    cactus.classList.add("cactus");
    setCustomProperty(cactus, "--left", 100);
    const a = Math.random();
    if(a<0.2){
      cactus.classList.add("smallc");
    } else if(a<0.4){
      cactus.classList.add("mediumc");
      const c1 = document.createElement("img");
      c1.src = "/images/cactus.png";
      c1.classList.add("cactus");
      c1.classList.add("mediumc");
      setCustomProperty(c1, "--left", 103);
      gameState.world!.append(c1);
    }
    
    if(a>0.8){
      const c1 = document.createElement("img");
      c1.src = "/images/cactus.png";
      c1.classList.add("cactus");
      c1.classList.add("smallc");
      setCustomProperty(c1, "--left", 97);
      const c2 = document.createElement("img");
      c2.src = "/images/cactus.png";
      c2.classList.add("cactus");
      c2.classList.add("smallc");
      setCustomProperty(c2, "--left", 103);
      gameState.world!.append(c1);
      gameState.world!.append(c2);
    }
    gameState.world!.append(cactus);
    //const cactus = <img ref={(el:HTMLImageElement) => (gameState.cactus.push(el))} className="cactus" src="images/cactus.png"/>
    //setCustomProperty(cactus as any, "--left", 100);
    //gameState.cactus.push(cactus as any);
  }
  
  function randomNumberBetween(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }