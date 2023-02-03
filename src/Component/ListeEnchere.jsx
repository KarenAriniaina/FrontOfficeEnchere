//props=Liste enchere:
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Accueil.css';




const Enchere = ({ enchere }) => {
    var photo="";
    if(enchere.photos.length!=0) enchere.photos[0].split("data:image/jpeg;base64,");
    return (
        <div class="col-lg-3 col-md-6 col-sm-6 col-12 mb-5">
            
            <img src={`${enchere.photos[0]}`} alt="Image" class="mb-4 img-fluid" /> 
            <h3 className='tm-text-primary mb-4' >{enchere.nom}</h3>
            <p class="tm-text-secondary h5 mb-4">{enchere.description}</p>
            <form>
                <p><Link to={"/FicheEnchere/" + enchere.idEnchere} value="Voir detail" >Voir detail</Link></p>
            </form>
        </div>
    );
}

export const ListeEnchere = ({ Liste }) => {
    return (
        <div class="row tm-mb-74 tm-people-row">

            {
                Liste.map(elements => <Enchere enchere={elements} />)
            }

        </div>
    )
};

export const ListerCategorie = ({ Liste }) => {
    return (
        <>
            {
                Liste.map(elements => <option value={elements.idCategorie}>{elements.designation}</option>)
            }
        </>
    )
};

export default ListeEnchere;
