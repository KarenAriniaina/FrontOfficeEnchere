import 'bootstrap/dist/css/bootstrap.min.css';


import { ListeEnchere, ListerCategorie } from '../Component/ListeEnchere';
import { useEffect, useState } from "react";
import '../css/Accueil.css';



import '../assets/fontawesome/css/all.min.css';
import '../assets/css/templatemo-style.css';
import images from '../assets/img/img-01.jpg';






import { Link } from 'react-router-dom';

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
    const [nbrenchere, setNombre] = useState(0);
    useEffect(() => {
        //setWait(true);
        fetch(`http://localhost:8080/Categories/`)
            .then(res => res.json())
            .then(res => {
                if (res.erreur !== null) setError(res.erreur);
                if (res.data !== null) {
                    setListeCategorie(res.data);
                }
            })
        //initialize();
    }, []);
    const [Liste, setListe] = useState([
        {
            idEnchere: "Enchere_1",
            description: "OK be",
            nom: "Enchere 1"
        },
        {
            idEnchere: "Enchere_2",
            description: "OK be2",
            nom: "Enchere 2"
        }
    ]);

    const initialize = () => {
        const params = new URLSearchParams();
        params.append('motsCle', motsCle);
        params.append('idCategorie', Categorie);
        params.append('prixmin', prixmin);
        params.append('prixmax', prixmax);
        params.append('Datedebut', datemin);
        params.append('DateFin', datemax);
        params.append('Statut', Statut);
        fetch(`http://localhost:8080/RechercheEncheres?${params}`)
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
        // setWait(true);
        //initialize();
    }
    if (wait === true) return (<p>Loading...</p>);
    return (
        <div class="container" >
            <div 
            style={{backgroundImage:`url(${images})` ,width:100,height:200 }}
            ></div>
              <div 
            style={{backgroundImage:`url(${'../assets/img/img-01.jpg'})` ,width:100,height:200 }}
            ></div>
            <img src="../assets/img/img-01.jpg" alt='Bonjour'/>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link nav-link-4 active" aria-current="page" href="contact.html">Accueil</a>
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

            {/* 
            <nav class="navbar navbar-expand-lg ">
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.html">
                        <i class=" mr-2"></i>
                        Enchere
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link value="Voir detail" to={"/HistoriqueEnchere"} class="nav-link nav-link-1"> Historique</Link>
                            </li>
                            <li class="nav-item">
                                <Link value="Voir detail" to={"/Login"} class="nav-link nav-link-1"> Deconnexion</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}


            {/* <div class="tm-hero d-flex justify-content-center align-items-center" data-parallax="scroll" data-image-src="img/hero.jpg"></div> */}
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




            {/* ato */}
            <div class="row tm-mb-74 tm-people-row">
                <ListeEnchere Liste={Liste} />
            </div>

            {/* <p><Link value="Voir detail" to={"/HistoriqueEnchere"} class="nav-link nav-link-1"> Historique</Link>  </p>
            <p><Link to={"/Login"}> Deconnexion </Link></p> */}


        </div >
    );
}

export default Accueil;