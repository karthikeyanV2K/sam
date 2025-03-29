import React from 'react'
import Home from './Home.js'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from './Admin.js'
import Temper from './items/Temper.js'
import Head from './items/Headphone.js'
import Power from './items/Powerbank.js'
import Estra from './items/Estra.js'
import Windows from './items/Windows.js'
import Charger from './items/Charger.js'
function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="123" element={<Admin/>}/>
        <Route path="/74656D706572" element={<Temper/>}/>
        <Route path="/63686172676572" element={<Charger/>}/>
        <Route path="/65737472612D666974696E6773" element={<Estra/>}/>
        <Route path="/706F77657262616E6B" element={<Power/>}/> 
        <Route path="/77696E646F7773" element={<Windows/>}/>
        <Route path="/6865616470686F6E6573" element={<Head/>}/>
    </Routes>
</Router>
  )
}

export default App