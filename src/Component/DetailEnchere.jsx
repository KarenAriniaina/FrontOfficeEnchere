import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { Table } from 'react-table';


const Detail = ({ enchere }) => {
    const header = ["Nom", "Montant"];
    
    return (
        <div className='row'>
            <div className='col-md-6'>
                <img href="../../assets/image/lux11.jpeg" alt='../../assets/image/lux11.jpeg' />
            </div>
            <div className='col-md-6'>
                <p>Nom produit:{enchere.nom}</p>
                <p>Description : {enchere.description}</p>
                <p>Duree enchere : {enchere.duree}</p>
                <p>Prix de base : {enchere.prixDepart}</p>
                <p>Date mise en enchere : {enchere.date}</p>
                <p>Liste client :</p>
                <table class="table "  >
                    <Header header={header} />

                    <tbody>
                        {
                            enchere.encherir.map(elements => <Tablebody content={elements} />)
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );

}
function Header(props) {
    let r = props.header;
    return (
        <tr>
            {
                r.map(elements => <th>{elements}</th>)
            }
        </tr>
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


export const DetailEnchere = ({ Liste }) => {
    console.log(Liste);
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