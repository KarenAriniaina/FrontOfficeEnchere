import { Link } from "react-router-dom";

const Navbar = () => {
    const deconnexion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("idClient");
    }
    if (localStorage.getItem("idClient") != null && localStorage.getItem("token") != null) {
        return (<nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link nav-link-4 active" aria-current="page" to={"/"}>Accueil</Link>
                        </li>
                        <li class="nav-item">
                            <Link value="Voir detail" to={"/HistoriqueEnchere"} class="nav-link nav-link-1"> Historique</Link>
                        </li>
                        <li class="nav-item">
                            <Link value="Voir detail" class="nav-link nav-link-1" onClick={deconnexion}> Deconnexion</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>);
    }
    return (
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link nav-link-4 active" aria-current="page" to={"/"}>Accueil</Link>
                        </li>
                        <li class="nav-item">
                            <Link value="Voir detail" to={"/Login"} class="nav-link nav-link-1"> Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;