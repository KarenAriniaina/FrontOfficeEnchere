import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/Enchere.css';

import '../css/Accueil.css';
import '../css/Enchere.css';


import '../assets/fontawesome/css/all.min.css';
import '../assets/css/templatemo-style.css';
import { Link } from 'react-router-dom';
import DetailEnchere from '../Component/DetailEnchere';
import Navbar from '../Component/Navbar';

function Detail() {
    let { id } = useParams();
    const [Prix, setPrix] = useState(0);
    const navige = useNavigate();
    const [Error, setError] = useState("");
    const [Liste, setListe] = useState([]);
    const [wait, setWait] = useState(false);

    const initialize = () => {
        if (Liste.length == 0) {
            setWait(true);
            fetch(`https://serveurenchere2-production.up.railway.app/Enchere/` + id, {
                referrerPolicy: "origin-when-cross-origin"
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.erreur != null) setError(res.erreur);
                    if (res.data != null) setListe(res.data[0]);
                    setWait(false);
                })
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (localStorage.getItem("token") !== null && localStorage.getItem("idClient") !== null) {
            setWait(true);
            fetch("https://serveurenchere2-production.up.railway.app/Encherir/" + id + "?Montant=" + Prix,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "idClient": localStorage.getItem("idClient"),
                        "token": localStorage.getItem("token")
                    }
                }
            )
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    setError(res.message);
                    console.log(Error.localeCompare("Vous n'etes pas connect??"));
                    if (res.message.localeCompare("Vous n'etes pas connect??") == 0) {
                        console.log("mitovy");
                        localStorage.removeItem("token");
                        localStorage.removeItem("idClient");
                        navige("/Login");
                    }
                    setWait(false);
                });
        }
        else {
            navige("/Login");
        }
    }
    useEffect(() => {
        initialize();
    }, []);
    if (wait === true) return (<p>Loading...</p>);
    const style = {
        flexGrow: 1,
    }
    if (Liste.length != 0) {
        return (
            <div class="container">
                <Navbar/>


                <div className='row'>

                    <div className="panel panel-default">

                        <div className="panel-body">
                            <div className='row'>
                                <DetailEnchere Liste={Liste} />


                                <form onSubmit={handleSubmit} id="form">
                                    <h3>Rencherir</h3>
                                    <div className=" col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="cat">Prix </label>
                                            <input type="text" onChange={(e) => { setPrix(e.target.value); }} />
                                        </div>
                                    </div>

                                    <div className='col-md-4'></div>
                                    <div className='col-md-2'></div>
                                    <div className="col-md-6">
                                        <button type="submit" className="btn btn-primary">Valider</button>
                                    </div>
                                    <div className='col-md-4'></div>
                                </form>
                                {Error && <p style={{ color: 'red' }}>{Error}</p>}

                                <div className='col-md-2'></div>
                            </div>
                        </div>
                    </div>
                </div></div>

        );
    }
    return (<p>Wait</p>);

}
export default Detail;