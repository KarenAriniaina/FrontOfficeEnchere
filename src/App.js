import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accueil from './page/Accueil';
import HistoriqueEnchere from './page/HistoriqueEnchere';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil/>} />
      <Route path="/HistoriqueEnchere" element={<HistoriqueEnchere/>} />
    </Routes>
  );
}

export default App;
