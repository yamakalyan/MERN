import { useEffect, useState } from "react";
import "../navbar/Navbar.scss"
import { NavLink } from "react-router-dom";
export default function Navbar() {
  const [active, setActive] = useState(false)

  const isActive =()=>{
    window.scrollY > 0 ? setActive(true) : setActive(false)
  }

  useEffect(()=>{
   window.addEventListener("scroll", isActive)
  }, [])
  return (
    <>
      <div className="container">
        <header>
            <div className="box">
            <div className="logo">
                <span><a href="#home">MERN application</a></span>
            </div>
            <div className="links-main">
                <ul className="links-ul">
                    <li><a href="#about">About</a></li>
                    <li><a href="#info">Information</a></li>
                    <li><a href="#posts">Posts</a></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/reg">Register</NavLink></li>
                </ul>
            </div>
            </div>

        </header>
        {active &&
        <nav>
            <div className="nav-main">
                <ul className="nav-ul">
                    <li><a>5</a></li>
                    <li><a>6</a></li>
                    <li><a>7</a></li>
                    <li><a>8</a></li>
                </ul>
            </div>
        </nav>
}
      </div>
    </>
  );
}
