import Navbar from "./componants/navbar/Navbar"
import Home from "./componants/home/Home"
import Info from "./componants/info/Info"
import "../src/App.scss"
import About from "./componants/About/About"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./componants/user/Login"
import Reg from "./componants/user/Reg"
function App() {

  return (
    <div className="app-main">
      <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/reg" element={<Reg/>}></Route>
      </Routes>
    <Home/>
    <Info/>
    <About/>
      </BrowserRouter>
    </div>
  )
}

export default App
