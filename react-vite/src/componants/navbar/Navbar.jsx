import { useEffect, useState } from "react";
import "../navbar/Navbar.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Auth } from "../Authentications/AuthProvider";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const authUser = Auth();
  const navigator = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
  }, []);
  return (
    <>
      <div className="container">
        <header>
          <div className="box">
            <div className="logo">
              <span>
                <Link className="main-link" to="/">MERN application</Link>
              </span>
            </div>
            <div className="links-main">
              <ul className="links-ul">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>

                {authUser.user ? (
                  <>
                    <li>
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                      <NavLink to="/posts">My Posts</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <button className="btn">
                      <NavLink to="/login">Login</NavLink>
                    </button>
                    <button className="btn">
                      <NavLink to="/reg">Register</NavLink>
                    </button>
                  </>
                )}
                {authUser.user && (
                  <li>
                    <button
                      style={{
                        padding: "8px",
                        border: "none",
                        borderRadius: "3px",
                        background : "rgb(128 232 245)"
                      }}
                      onClick={() => {
                        navigator("/login");
                        localStorage.removeItem("token");
                        window.location.reload(false);
                      }}
                    >
                      Log-out
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </header>
        {active && (
          <nav>
            <div className="nav-main">
              <ul className="nav-ul">
                <li>
                  <a>5</a>
                </li>
                <li>
                  <a>6</a>
                </li>
                <li>
                  <a>7</a>
                </li>
                <li>
                  <a>8</a>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
