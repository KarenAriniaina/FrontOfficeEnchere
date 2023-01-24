import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ListeEnchere from './Component/ListeEnchere';

function Accueil() {
    const Liste = [
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
    ];
    return (
        <div className='row text-center'>
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

    );
}

export default Accueil;