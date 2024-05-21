import { useEffect, useState } from "react";

const useWinDims = () => {
    const [winDims, setWinDims] = useState({w: window.innerWidth, h: window.innerHeight});
    const updateDims = () => {
        setWinDims({w: window.innerWidth, h: window.innerHeight});
    }
    useEffect(()=>{
        window.addEventListener("resize",updateDims);
        return () => window.removeEventListener("resize", updateDims);
    },[updateDims]);
    return winDims;
}

export default useWinDims;