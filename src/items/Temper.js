import { useState, useEffect } from "react";
import { getItems } from "../api";
import './item.css';

function Home() {
  const [items, setItems] = useState({ temper: [] });

  useEffect(() => {
    getItems()
      .then((response) => {
        setItems(response.data || { temper: [] });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setItems({ temper: [] });
      });
  }, []);

  return (
    <div className="page-wrapper">
      {["temper"].map((cat) => (
        <div className="container" key={cat}>
          <h2 className="category-title">
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </h2>
          <div className="cards-grid">
            {items[cat] && items[cat].length > 0 ? (
              items[cat].map((item) => (
                <div className="card" key={item.id}>
                  <div className="card-inner">
                    <img
                      className="card-image"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="card-content">
                      <h3 className="card-title">{item.name}</h3>
                      <p className="card-price">₹{item.rate}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items available in {cat} category.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;