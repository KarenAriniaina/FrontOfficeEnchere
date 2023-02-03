import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import '../css/Enchere.css';
import images from '../assets/img/img-01.jpg';




const Detail = ({ enchere }) => {
    console.log(enchere);
    alert('../assets/img/img-01.jpg')
    return (

        <div>
            <div className='row'    >
                <div className='col-md-6'>
                    <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                {/* {enchere.photos.map(photo => <Photo photo={photo} />)} */}
                                <img src={images} />
                            </div>
                            <div class="carousel-item">
                                <img src={images} />
                            </div>
                            <div class="carousel-item">
                                <img src={images} />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>



                </div>
                <div className='col-md-6'>
                    <p>Nom produit:{enchere.nom}</p>
                    <p>Description: {enchere.description}</p>
                    <p>Prix de base: {enchere.prixDepart}</p>
                    <p>Date mise en enchere: {enchere.date}</p>
                    <p>Date  fin enchere: {enchere.dateFin}</p>
                    <p>Liste client :</p>

                </div>
            </div>

            <ListeEncherir encherir={enchere.encherir} />
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
            <>
                <h2>Liste client </h2>

                <table className="table "  >
                    <Header header={header} />
                </table>
            </>
        );
    }
}
function Photo(props) {
    if (props.photo == undefined) {
        return (
            <></>
        );
    }
    //.log("<img src="+props.photo[0]+">");
    return (
        <div>
            <img src={props.photo} />

        </div>
    );

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