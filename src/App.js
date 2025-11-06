import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (  
  <AuthProvider> 
   <BrowserRouter>
   <div>
    <Navbar/>
   </div>


  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/dashboard' element={<privateRoute><Dashboard /></privateRoute>} />
   </Routes>
   
  
   </BrowserRouter>
   </AuthProvider>
  );
}

export default App;
