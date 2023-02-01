import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';

const Detail = ({ enchere }) => {
    return (
        <div className='row'>
            <div className='col-md-6'>
                <img href="../../assets/image/lux11.jpeg" alt='../../assets/image/lux11.jpeg' />
            </div>
            <div className='col-md-6'>
                <p>Nom produit:{enchere.nom}</p>
                <p>Description : {enchere.description}</p>
                <p>Prix de base : {enchere.prixDepart}</p>
                <p>Date mise en enchere : {enchere.date}</p>
                <p>Date  fin enchere : {enchere.dateFin}</p>
                <p>Liste client :</p>
                <ListeEncherir encherir={enchere.encherir} />
            </div>
        </div>
    );

}
function Header(props) {
    let r = props.header;
    return (
        <thead>
                {
                    r.map(elements => <th>{elements}</th>)
                }
        </thead>
    );
}
function Tablebody(props) {
    let body = props.content;
    console.log(body);
    return (

        <tr>
            <td>{body.Client}</td>
            <td>{body.Montant}</td>
        </tr>

    );
}

function ListeEncherir(props) {
    const header = ["Nom", "Montant"];
    if (props.encherir != undefined) {
        return (
            <table className="table "  >
                <Header header={header} />
                <tbody>
                    {
                        props.encherir.map(elements => <Tablebody content={elements} />)
                    }
                </tbody>
            </table>
        );
    }
    else {
        return (
            <table className="table "  >
                <Header header={header} />
            </table>
        );
    }
}


export const DetailEnchere = ({ Liste }) => {
    return (
        <div className='row'>
            <div className='col-md-2'></div>
            <div className="col-md-8">
                <div className="row">
                    {
                        <Detail enchere={Liste} />
                    }
                </div>
            </div>
            <div className='col-md-2'></div>
        </div>
    )
};

export default DetailEnchere;