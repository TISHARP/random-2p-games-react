import { Link, useNavigate } from "react-router-dom";
import DinoGame from "../../components/DinoGame/DinoGame";
import { Button } from "@mui/material";

const PageNotFound = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    }
    return (
        <div className="page-not-found-page">
            <h1 style={{textAlign: 'center'}}>Page Not Found</h1>
            <DinoGame />
            <Button variant="outlined" sx={{minWidth: 260, margin: '3px', marginBottom: '93px', marginLeft: 'auto', marginRight: 'auto', display: 'block'}} onClick={handleHome}>Choose Another Game</Button>
        </div>
    )
}

export default PageNotFound;