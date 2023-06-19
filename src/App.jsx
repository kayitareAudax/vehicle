import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from 'axios'
import NewEmployee from './pages/NewEmployee';
import LaptopsPage from './pages/LaptopsPage';
function App() {
  axios.defaults.baseURL='http://localhost:5000'
  return (
    <div className="">
      <Router>
      {/* <Navbar /> */}
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/new" exact element={<NewEmployee />} />
          <Route path='/laptop' exact element={<LaptopsPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
