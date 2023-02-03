import 'bootstrap/dist/css/bootstrap.min.css';


import { ListeEnchere, ListerCategorie } from '../Component/ListeEnchere';
import { useEffect, useState } from "react";
import '../css/Accueil.css';



import '../assets/fontawesome/css/all.min.css';
import '../assets/css/templatemo-style.css';
import images from '../assets/img/img-01.jpg';






import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar';

function Accueil() {

    const [motsCle, setMotCle] = useState("");
    const [Categorie, setCategorie] = useState("");
    const [prixmin, setPrixMin] = useState(0);
    const [prixmax, setPrixMax] = useState(0);
    const [datemin, setDateMin] = useState("");
    const [datemax, setDateMax] = useState("");
    const [Statut, setStatut] = useState(0);
    const [Error, setError] = useState("");
    const [wait, setWait] = useState(false);
    var [ListeCategorie, setListeCategorie] = useState([]);
    const [Liste, setListe] = useState([]);
    const navige = useNavigate();
    const [nbrenchere, setNombre] = useState(0);
    useEffect(() => {
        setWait(true);
        initialize();
        fetch(`https://serveurenchere2-production.up.railway.app/Categories/`)
            .then(res => res.json())
            .then(res => {
                if (res.erreur !== null) setError(res.erreur);
                if (res.data !== null) {
                    setListeCategorie(res.data);
                }
            })
    }, []);

    const initialize = () => {
        const params = new URLSearchParams();
        params.append('motsCle', motsCle);
        params.append('idCategorie', Categorie);
        params.append('prixmin', prixmin);
        params.append('prixmax', prixmax);
        params.append('Datedebut', datemin);
        params.append('DateFin', datemax);
        params.append('Statut', Statut);
        fetch(`https://serveurenchere2-production.up.railway.app/RechercheEncheres?${params}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.erreur !== null) {
                    setError(res.erreur);
                }
                if (res.data !== null) {
                    console.log(res.data)
                    setListe(res.data)
                    setNombre(Liste.length)
                }
                setWait(false);
            });
    }

    const submit = (event) => {
        event.preventDefault();
        setWait(true);
        initialize();
        //setWait(false);
    }
    if (wait === true) return (<p>Loading...</p>);
    return (
        <div class="container" >
            <Navbar/>
            <div>
                <div class="col-md-1" ></div>

                <div class="tm-hero d-flex justify-content-center align-items-center" data-parallax="scroll"  >
                    <form role="form" onSubmit={submit} class="d-flex tm-search-form">
                        <div>
                            <div class="row">
                                <label>Mot Clé</label>
                                <div className="mb-3">
                                    <input type="text" className="form-control" style={{ marginRight: 10, width: 200 }} value={motsCle} name="motsClé" placeholder="Mot clé" onChange={(e) => { setMotCle(e.target.value); }} />
                                </div>
                            </div>
                            <div class="row">
                                <label>Categorie</label>
                                <div className="mb-3">
                                    <select name="idCategorie" className="form-control" onChange={(e) => { setCategorie(e.target.value); }} style={{ marginRight: 10, width: 200 }} >
                                        <option value="">Categorie</option>
                                        {<ListerCategorie Liste={ListeCategorie} />}
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <label>Prix </label>
                                <div class="col-md-6">
                                    <input type="text" className="form-control" name="prixmin" placeholder="Prix Min" onChange={(e) => { setPrixMin(e.target.value); }} style={{ marginRight: 10, width: 200 }} />
                                </div>
                                <div class="col-md-6">
                                    <input type="text" className="form-control" name="prixmax" placeholder="Prix Max" onChange={(e) => { setPrixMax(e.target.value); }} style={{ marginRight: 10, width: 200 }} />
                                </div>
                            </div>


                            <div class="row">
                                <label>Date </label>
                                <div class="col-md-6">
                                    <input type="date" className="form-control" name="Datedebut" onChange={(e) => { setDateMin(e.target.value); }} style={{ marginRight: 10, width: 200 }} />

                                </div>
                                <div class="col-md-6">
                                    <input type="date" className="form-control" name="DateFin" onChange={(e) => { setDateMax(e.target.value); }} style={{ marginRight: 10, width: 200 }} />
                                </div>

                            </div>
                            <div class="row">
                                <label>Statut</label>
                                <div className="mb-3">
                                    <select name="Statut" className="form-control" onChange={(e) => { setStatut(e.target.value); }} style={{ marginRight: 10, width: 200 }} >
                                        <option value={0}>Statut</option>
                                        <option value={1}>En cours</option>
                                        <option value={2}>Fini</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">

                                <div className="text-center">
                                    <input type="submit" className="btn btn-danger" value="Rechercher" />
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="col-md-1" ></div>
            </div>
            <div class="row tm-mb-74 tm-people-row">
                <ListeEnchere Liste={Liste} />
            </div>

        </div >
    );
}

export default Accueil;