//props=Liste enchere:
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const registerUser = () => {
    console.log("ok");
    console.log(this.enchere.idEnchere);
    //initialize();
}

const Enchere = ({ enchere }) => {
    return (
        <div className="col-md-4">
            <div className="thumbnail">
                <div className="caption">
                    <h3>{enchere.nom}</h3>
                    <p>{enchere.description}</p>
                    <form onSubmit={registerUser}>
                        <p><a href='#' className="btn btn-primary" type="submit" role="button">Voir detail</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export const ListeEnchere = ({ Liste }) => {
    return (
        <div className="col-md-7">
            <div className="row">
                {
                    Liste.map(elements => <Enchere enchere={elements} />)
                }
            </div>
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
