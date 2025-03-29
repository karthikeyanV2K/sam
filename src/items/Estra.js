import { useState, useEffect } from "react";
import { getItems } from "../api";
import './item.css';

function Home() {
  const [items, setItems] = useState({ estra: [] });

  useEffect(() => {
    getItems()
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="page-wrapper">
      {["estra"].map((cat) => (
        <div className="container" key={cat}>
          <h2 className="category-title">Estrafitings</h2>
          <div className="cards-grid">
            {items[cat].map((item) => (
              <div className="card" key={item.id}>
                <div className="card-inner">
                  <img className="card-image" src={item.image} alt={item.name} />
                  <div className="card-content">
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-price">₹{item.rate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;