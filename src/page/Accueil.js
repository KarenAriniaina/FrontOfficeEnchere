import 'bootstrap/dist/css/bootstrap.min.css';
import { ListeEnchere, ListerCategorie } from '../Component/ListeEnchere';
import { useEffect, useState } from "react";

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
    const [nbrenchere,setNombre] =useState(0);
    useEffect(() => {
        setWait(true);  
        fetch(`http://localhost:8080/Categories/`)
            .then(res => res.json())
            .then(res => {
                if (res.erreur !== null) setError(res.erreur);
                if (res.data !== null) {
                    setListeCategorie(res.data);
                }
            })
        initialize();
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
        setWait(true);
        initialize();
    }
    if (wait === true) return (<p>Loading...</p>);
    return (
        <div className='row'>
            <div className='col-md-2'>
                <form role="form" onSubmit={submit} >
                    <label>Mot Clé</label>
                    <div className="mb-3">
                        <input type="text" className="form-control" value={motsCle} name="motsClé" placeholder="Mot clé" onChange={(e) => { setMotCle(e.target.value) }} />
                    </div>
                    <label>Categorie</label>
                    <div className="mb-3">
                        <select name="idCategorie" className="form-control" onChange={(e) => { setCategorie(e.target.value) }} >
                            <option value="">Categorie</option>
                            {
                                <ListerCategorie Liste={ListeCategorie} />
                            }
                        </select>
                    </div>
                    <label>Prix min</label>
                    <div className="mb-3">
                        <input type="text" className="form-control" name="prixmin" placeholder="Prix Min" onChange={(e) => { setPrixMin(e.target.value) }} />
                    </div>
                    <label>Prix max</label>
                    <div className="mb-3">
                        <input type="text" className="form-control" name="prixmax" placeholder="Prix Max" onChange={(e) => { setPrixMax(e.target.value) }} />
                    </div>
                    <label>Date min</label>
                    <div className="mb-3">
                        <input type="date" className="form-control" name="Datedebut" onChange={(e) => { setDateMin(e.target.value) }} />
                    </div>
                    <label>Date max</label>
                    <div className="mb-3">
                        <input type="date" className="form-control" name="DateFin" onChange={(e) => { setDateMax(e.target.value) }} />
                    </div>
                    <label>Statut</label>
                    <div className="mb-3">
                        <select name="Statut" className="form-control" onChange={(e) => { setStatut(e.target.value) }}>
                            <option value={0}>Statut</option>
                            <option value={1}>En cours</option>
                            <option value={2}>Fini</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <input type="submit" className="btn btn-danger" value="Inserer" />
                    </div>
                </form>
            </div>
            <div className='col-md-10 text-center'>
                <div className="panel panel-default" >
                    <div className="panel-heading">
                        <h2>Liste Enchere</h2>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className='col-md-4'>
                            </div>
                            <ListeEnchere Liste={Liste} />
                        </div>
                    </div>
                </div>
            </div>
            {Error && <p style={{ color: 'red' }}>{Error}</p>}
        </div>
    );
}

export default Accueil;