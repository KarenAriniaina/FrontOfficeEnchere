import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';

import '../assets/plugins/fontawesome-free/css/all.min.css';
import '../assets/dist/css/adminlte.min.css';

function Login() {
    const navige = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("idClient") != null && localStorage.getItem("token") != null) {
            navige("/");
        }
    }, []);
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const [wait, setWait] = useState(false);
    const initialize = () => {
        //console("niditra tato");
        setError("Loading...");
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('mdp', password);
        fetch(`http://localhost:8080/LoginClient?${params}`, {
            method: 'POST',
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.data != null && res.data.length != 0) {
                    localStorage.setItem("token", res.data[0].token);
                    localStorage.setItem("idClient", res.data[0].idClient);
                    setError(res.message);
                    navige("/");
                }
                else {
                    setError(res.message);
                }
            })
    };
    const registerUser = (event) => {
        event.preventDefault();
        console.log("ok");
        initialize();
    }
    return (
        <>
    



        {/*  */}

            <div class="flex-container">


                <form onSubmit={registerUser} id="form">
                    <h1>Se connecter</h1>
                    <div className=" col-md-6">
                        <div className="form-group">
                            <label htmlFor="cat">Email</label>
                            <input type="text" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                    </div>
                    <div className=" col-md-6">
                        <div className="form-group">
                            <label htmlFor="cat">Mot de passe</label>
                            <input type="password" onChange={(e) => { setpassword(e.target.value) }} />
                        </div>
                    </div>
                    <div className='col-md-4'></div>
                    <div className='col-md-2'></div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" >Se connecter</button>
                        </div>
                    </div>
                    <div className='col-md-4'></div>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}

            </div>

        </>

    );
}
export default Login;