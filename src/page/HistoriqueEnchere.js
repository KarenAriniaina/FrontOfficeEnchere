import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListeEnchere } from '../Component/ListeEnchere';

import '../assets/fontawesome/css/all.min.css';
import '../assets/css/templatemo-style.css';
import { Link } from 'react-router-dom';

function HistoriqueEnchere() {
    const navige = useNavigate();
    const [Error, setError] = useState("");
    const [Liste, setListe] = useState([]);
    const [wait, setWait] = useState(false);
    const initialize = () => {
        setWait(true);
        fetch("http://localhost:8080/HistoriqueEncheres/", {
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
    return (
        <>

            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link nav-link-4 active" aria-current="page" href="/">Accueil</a>
                            </li>
                            <li class="nav-item">
                                <Link value="Voir detail" to={"/HistoriqueEnchere"} class="nav-link nav-link-1"> Historique</Link>
                            </li>
                            <li class="nav-item">
                                <Link value="Voir detail" to={"/Deconnexion"} class="nav-link nav-link-1"> Deconnexion</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

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