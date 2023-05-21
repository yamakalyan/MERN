import Navbar from "./componants/navbar/Navbar";
import Home from "./componants/home/Home";
import Info from "./componants/info/Info";
import "../src/App.scss";
import About from "./componants/About/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componants/user/Login";
import Reg from "./componants/user/Reg";
import Profile from "./componants/user/Profile";
import Posts from "./componants/user/Posts";
import { AuthProvider } from "./componants/Authentications/AuthProvider";
import Authentication from "./componants/Authentications/Authentication";
function App() {
  return (
    <div className="app-main">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/info" element={<Info />}></Route>
            <Route path="/posts" element={<Authentication>
              <Posts />
              </Authentication>
              }></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/reg" element={<Reg />}></Route>
            <Route
              path="/profile"
              element={
                <Authentication>
                  <Profile />
                </Authentication>
              }
            ></Route>
          </Routes>
          <About />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
