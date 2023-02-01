import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accueil from './page/Accueil';
import HistoriqueEnchere from './page/HistoriqueEnchere';
import FicheEnchere from './page/FicheEnchere';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil/>} />
      <Route path="/HistoriqueEnchere" element={<HistoriqueEnchere/>} />
      <Route path="/FicheEnchere/:id" element={<FicheEnchere/>} />
    </Routes>
  );
}

export default App;
