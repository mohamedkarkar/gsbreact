import './App.css'; 
import { Routes, Route, BrowserRouter } from 'react-router-dom'; 
import Home from './pages/Home'; 
import Login from './pages/Login'; 
import Dashboard from './pages/Dashboard'; 
import Navbar from './components/Navbar'; 
import { AuthProvider } from './context/AuthContext'; 
import FraisAdd from './pages/FraisAdd';
import FraisEdit from './components/FraisEdit'
import PrivateRoute from './components/PrivateRoute';
import FraisHorsForfait from './pages/FraisHorsForfait';
import FraisHorsForfaitAdd from './pages/FraisHorsForfaitAdd';

function App() { 
  return ( 

  <AuthProvider> 
    <BrowserRouter> 
    <div> <Navbar/> </div> 
    <Routes> 
      <Route path='/' element={<Home />} /> 
      <Route path='/login' element={<Login />} /> 
      <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} /> 
      <Route path='frais/ajouter' element={<FraisAdd/>} />
      <Route path="/frais/modifier/:id" element={<FraisEdit/>} />
      <Route path="/frais/:id/hors-forfait" element={<FraisHorsForfait />} />
      <Route path="/frais/:id/hors-forfait/ajouter" element={<FraisHorsForfaitAdd />} />
      </Routes> 
    </BrowserRouter> 
  </AuthProvider> 
  ); 
} export default App;