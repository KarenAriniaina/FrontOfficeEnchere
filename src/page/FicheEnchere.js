import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailEnchere from "../Component/DetailEnchere";

function FicheEnchere() {
    let { id } = useParams();
    console.log(id);
    const [enchere, setEnchere] = useState([
        {
            nom: "lol",
            description: "lol",
            dateFin: "2022-10-11",
            date: "2022-10-10",
            prixDepart: 20000
        }
    ]);
    const [wait, setWait] = useState(false);
    const [erreur, setError] = useState("");
    useEffect(() => {
        console.log("niditra tao");
        setWait(true);
        console.log(wait);
        fetch(`http://localhost:8080/Enchere/` + id)
            .then(res => res.json())
            .then(res => {
                if (res.erreur !== null) setError(res.erreur);
                if (res.data !== null) {
                    setEnchere(res.data);
                }
                setWait(false);
            })
    }, []);
    if (wait == true) return (<p>Loading...</p>);
    return (
        <div>
            <DetailEnchere Liste={enchere[0]} />
            {Error && <p style={{ color: 'red' }}>{Error}</p>}
        </div>
    );
}
export default FicheEnchere;