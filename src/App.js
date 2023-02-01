import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accueil from './page/Accueil';
import HistoriqueEnchere from './page/HistoriqueEnchere';
import Detail from './page/Encheres';
import Login from './page/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil/>} />
      <Route path="/HistoriqueEnchere" element={<HistoriqueEnchere/>} />
      <Route path="/FicheEnchere/:id" element={<Detail/>} />
      <Route path="/Login" element={<Login/>} />
    </Routes>
  );
}

export default App;
