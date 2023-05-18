import "../navbar/Navbar.scss"
export default function Navbar() {
  return (
    <>
      <div className="container">
        <header>
            <div className="logo">
                <span>logo</span>
            </div>
            <div className="links-main">
                <ul className="links-ul">
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>3</a></li>
                    <li><a>4</a></li>
                </ul>
            </div>
        </header>
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
      </div>
    </>
  );
}
