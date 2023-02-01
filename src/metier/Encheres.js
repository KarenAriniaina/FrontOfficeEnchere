import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DetailEnchere from '../Component/DetailEnchere';

function Detail() {

    const [Error, setError] = useState("");
    const [Liste, setListe] = useState([]);
    const [wait, setWait] = useState(false);

    const initialize = () => {
        setWait(true);
        fetch("https://serveurenchere-production.up.railway.app/Enchere/Enchere_2", {
            referrerPolicy: "origin-when-cross-origin"
        }).then(res => res.json())
            .then(res => {
                 if (res.erreur != null) setError(res.erreur);
                 if (res.data != null) setListe(res.data[0]);
                console.log(res);
                setWait(false);

            })
    }

    useEffect(() => {

        initialize();


    }, []);
    if (wait === true) return (<p>Loading...</p>);
    console.log(Liste);






    //console.log(Liste.idEnchere);
    return (
        <div className='row'>
            <div className="panel panel-default" >
                <div className="panel-heading text-center">
                    <h2>Liste Enchere</h2>
                </div>
                <div className="panel-body">
                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-8'>
                            <DetailEnchere Liste={Liste}

                            />
                        </div>
                        <div className='col-md-2'></div>
                    </div>
                </div>
            </div>
        </div>

    );

}
export default Detail;