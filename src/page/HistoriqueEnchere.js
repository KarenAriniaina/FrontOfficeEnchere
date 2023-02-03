import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListeEnchere } from '../Component/ListeEnchere';

import '../assets/fontawesome/css/all.min.css';
import '../assets/css/templatemo-style.css';
import { Link } from 'react-router-dom';
import Navbar from '../Component/Navbar';

function HistoriqueEnchere() {
    const navige = useNavigate();
    const [Error, setError] = useState("");
    const [Liste, setListe] = useState([]);
    const [wait, setWait] = useState(false);
    const initialize = () => {
        setWait(true);
        fetch("https://serveurenchere2-production.up.railway.app/HistoriqueEncheres/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "idClient": localStorage.getItem("idClient"),
                "token": localStorage.getItem("token")
            },
            referrerPolicy: "origin-when-cross-origin"
        }).then(res => res.json())
            .then(res => {
                if (res.erreur != null) setError(res.erreur);
                if (res.data != null) setListe(res.data);
                setWait(false);
            })
    }
    useEffect(() => {
        if (localStorage.getItem("idClient") === null || localStorage.getItem("token") === null) {
            console.log(localStorage.getItem("idClient"));
            navige("/")
        }
        else {
            initialize();
        }

    }, []);
    if (wait === true) return (<p>Loading...</p>);
    if (localStorage.getItem("idClient") === null || localStorage.getItem("token") === null) {
        console.log(localStorage.getItem("idClient"));
        navige("/")
    }
    return (
        <>
            <Navbar/>
            <div className='col-md-10 text-center'>
                <div className="panel panel-default" >
                    <div className="panel-heading">
                        <h2>Liste des Historiques de vos Enchere</h2>
                    </div>
                    <div >
                        <div className="container">


                            <div>
                                <ListeEnchere Liste={Liste} />
                            </div>


                        </div>

                    </div>
                </div>
            </div>
            {Error && <p style={{ color: 'red' }}>{Error}</p>}
        </>
    );
}

export default HistoriqueEnchere;