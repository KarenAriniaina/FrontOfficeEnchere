import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DetailEnchere from '../Component/DetailEnchere';

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
            fetch(`http://localhost:8080/Enchere/` + id, {
                referrerPolicy: "origin-when-cross-origin"
            }).then(res => res.json())
                .then(res => {
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
            fetch("http://localhost:8080/Encherir/" + id + "?Montant=" + Prix,
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
                    console.log(Error.localeCompare("Vous n'etes pas connecté"));
                    if(res.message.localeCompare("Vous n'etes pas connecté")==0){
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
    return (
        <div className='row'>
            <div className="panel panel-default" >
                <div className="panel-heading text-center">
                    <h2>Detail Enchere</h2>
                </div>
                <div className="panel-body">
                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-8'>
                            <DetailEnchere Liste={Liste} />
                            <div className="row col-md-offset-6">
                                <form onSubmit={handleSubmit} id="form">
                                    <h1>Rencherir</h1>
                                    <div className=" col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="cat">Prix</label>
                                            <input type="text" onChange={(e) => { setPrix(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='col-md-4'></div>
                                    <div className='col-md-2'></div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary" >Valider</button>
                                        </div>
                                    </div>
                                    <div className='col-md-4'></div>
                                </form>
                                {Error && <p style={{ color: 'red' }}>{Error}</p>}
                            </div>
                        </div>
                        <div className='col-md-2'></div>
                    </div>
                </div>
            </div>
        </div >

    );

}
export default Detail;