import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing components
import Home from './Pages/Home';
import Admindashboard from './Pages/Dashboard/Admindashboard';
import UserLogin from './Pages/Login/UserLogin';
import UserRegister from './Pages/Login/UserRegister';
import ClientDashboard from './Pages/Dashboard/ClientDashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Admin' element={<Admindashboard />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path="/Register" element={<UserRegister />} />
        <Route path='/ClientDashboard' element={<ClientDashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
