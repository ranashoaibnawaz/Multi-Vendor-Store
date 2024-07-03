import './App.css';
import Navbar from './components/header/Navbar';
import NewNavbar from './NewNavbar/NewNavbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Admin from './components/Admin/Admin';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './components/SigIn_SignUp/SignIn';
import SignUp from './components/SigIn_SignUp/SignUp';
import Cart from './components/Cart/Cart';
import BuyNow from './components/BuyNow/BuyNow';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <NewNavbar/>
    <Routes>
    <Route exect path='/' element={<Home/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/cart/:id' element={<Cart/>}/>
    <Route path='/buynow' element={<BuyNow/>}/>
    <Route path='/Admin' element={<Admin/>}/>
    <Route path='/Dashboard' element={<Dashboard/>}/>
    </Routes>
    
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
