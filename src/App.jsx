import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CarRegistration from './pages/CarRegistration'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OwnerPage from './pages/OwnerPage'
import axios from 'axios'
function App() {
  axios.defaults.baseURL='http://localhost:5000'
  return (
    <div className="">
      <Router>
      {/* <Navbar /> */}
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/vehicles" exact element={<CarRegistration />} />
          <Route path='/owners' exact element={<OwnerPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
