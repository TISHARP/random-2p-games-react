import React, { useRef } from "react";

const useAnimationFrame = (callback: (delta:number)=>void, willRun=0) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = useRef(0);
    const previousTimeRef = useRef(0);
    
    const animate = (time:number) => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime)
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }
    
    React.useEffect(() => {
      if(willRun===1)
        requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }, [willRun]); // Make sure the effect runs only once
  }
export default useAnimationFrame;