import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from 'axios'
import NewEmployee from './pages/Cart';
import { CartProvider } from './context/CartContext'; // Import the CartProvider
import SignupScreen from './pages/SignupScreen';
import Cart from './pages/Cart';
import Report from './pages/Report';

function App() {
  axios.defaults.baseURL='http://localhost:8080'
  return (
    <div className="">
      <CartProvider> {/* Wrap the Router with the CartProvider */}
        <Router>
          {/* <Navbar /> */}
          <Routes>
            <Route path='/signup' exact element={<SignupScreen/>}/>
            <Route path="/" exact element={<Login />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path='/report' exact element={<Report/>}/>
          </Routes>
        </Router>
      </CartProvider>
    </div>
  )
}

export default App
