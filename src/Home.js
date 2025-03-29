import React from 'react';
import { Instagram, Youtube, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import './home.css'

function App() {
  return (
    <div className="container">
      <header className="header">
        <div className="contact-info">
          <div className="info-item">
            <Phone className="icon" />
            <p>8940205716</p>
          </div>
          <div className="info-item">
            <Mail className="icon" />
            <p>petersam1347@gmail.com</p>
          </div>
        </div>

        <div className="social-links">
          <a 
            href="https://www.instagram.com/petersam1347?utm_source=qr&igsh=MTRvNnN1cWg2ZDRs"
            className="social-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="icon" />
            <span>Instagram</span>
          </a>
          
          <a 
            href="https://youtube.com/@v.sampremkumar?si=TxhK2gnsLkhHQnqW"
            className="social-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="icon" />
            <span>YouTube</span>
          </a>
        </div>
      </header>

  

      <nav className="bottom-navigation">
        <ul className="nav-list">
          <li><Link className="nav-link" to="/74656D706572">Temper</Link></li>
          <li><Link className="nav-link" to="/63686172676572">Charger</Link></li>
          <li><Link className="nav-link" to="/65737472612D666974696E6773">Estra Fitings</Link></li>
          <li><Link className="nav-link" to="/706F77657262616E6B">Powerbank</Link></li>
          <li><Link className="nav-link" to="/77696E646F7773">Windows</Link></li>
          <li><Link className="nav-link" to="/6865616470686F6E6573">Headphones</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;