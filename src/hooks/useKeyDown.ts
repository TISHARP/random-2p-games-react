import { useEffect, useState } from "react";

const useKeyDown = (initFunctions={}) => {
    const handleKeys = (functions: {[Key: string]: (e:any)=>void}) => (e:any) => {
        if("keypress" in functions){
            functions["keypress"](e);
        }
        console.log(e.key);
        if(e.key in functions){
            functions[e.key](e);
        }
    }
    useEffect(()=>{
        window.addEventListener("keydown",handleKeys(initFunctions));
        return () => window.removeEventListener("keydown", handleKeys(initFunctions));
    },[]);
}

export default useKeyDown;