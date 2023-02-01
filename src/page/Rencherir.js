import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function rencherir(idenchere){
    const [Prix, setPrix] = useState(0);
    const [Error, setError] = useState("");
    const navige = useNavigate();
    const [wait,setWait]=useState(false);
    const handleSubmit = () => {
        e.preventDefault();
        if (localStorage.getItem("token") !== null && localStorage.getItem("idClient") !== null) {
            setWait(true);
            fetch("http://localhost:8080/Encherir/" + idenchere,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "idClient": localStorage.getItem("idClient"),
                        "token": localStorage.getItem("token")
                    },
                    body: JSON.stringify({ 'Montant': Prix }),
                }
            )
                .then((response) => response.json())
                .then((res) => {
                    if(res.erreur!=null){
                        setError(res.erreur);
                    }
                    if(res.data!=null){
                        setError(res.message);
                    }
                });
        }
        else {
            navige("/");
        }
    }
    if(wait==true){
        setError("Loading...");
    }
    return (
        <>
            <div className="main-block">
                <div className="left-part">
                    <i className="fas fa-envelope"></i>
                    <i className="fas fa-at"></i>
                    <i className="fas fa-mail-bulk"></i>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Rencherir</h1>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="cat">Prix</label>
                                <input type="number" onChange={(e) => { setPrix(e.target.value) }} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" >Valider</button>
                            </div>
                        </div>
                    </div>
                </form>
                {Error && <p style={{ color: 'red' }}>{Error}</p>}
            </div>
        </>
    );
}

export default rencherir;