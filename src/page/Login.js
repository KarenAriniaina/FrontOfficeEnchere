import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';

import '../assets/plugins/fontawesome-free/css/all.min.css';
import '../assets/dist/css/adminlte.min.css';
import Navbar from "../Component/Navbar";

function Login() {
    const navige = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("idClient") != null && localStorage.getItem("token") != null) {
            navige("/");
        }
    }, []);
    const [email, setEmail] = useState("rabe@gmail.com");
    const [password, setpassword] = useState("raberabe");
    const [error, setError] = useState("");
    const [wait, setWait] = useState(false);
    const initialize = () => {
        //console("niditra tato");
        setError("Loading...");
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('mdp', password);
        fetch(`https://serveurenchere2-production.up.railway.app/LoginClient?${params}`, {
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
    if (localStorage.getItem("idClient") !== null || localStorage.getItem("token") !== null) {
        navige("/")
    }
    return (
        <>
            <Navbar />
            <div class="container-fluid tm-mt-100">
                <div class="row tm-mb-100">
                    <div class="col-md-4 col-12 mb-5">
                        <h2 class="tm-text-primary mb-5 text-center">Login</h2>
                        <form id="contact-form" onSubmit={registerUser} class="tm-contact-form mx-auto col-md-4">
                            <div class="form-group">
                                <label>Email:</label>
                                <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div class="form-group">
                                <label>Mot de passe:</label>
                                <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                            </div>
                            <div class="form-group tm-text-right">
                                <button type="submit" class="btn btn-primary">Se connecter</button>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                    </div>
                </div>
            </div > 

        </>

    );
}
export default Login;