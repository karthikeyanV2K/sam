import { useState, useEffect } from "react";
import { getItems, addItem, deleteItem } from "./api";
import './admin.css';

function Admin() {
  const [category, setCategory] = useState("temper");
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [items, setItems] = useState({
    temper: [],
    headphone: [],
    power: [],
    charger: [],
    window: [],
    estra: [],
    others: [],
  });

  useEffect(() => {
    getItems()
      .then((response) => {
        setItems(response.data || {
          temper: [],
          headphone: [],
          power: [],
          charger: [],
          window: [],
          estra: [],
          others: [],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setItems({
          temper: [],
          headphone: [],
          power: [],
          charger: [],
          window: [],
          estra: [],
          others: [],
        });
      });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/webp", "image/bmp", "image/tiff"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid image type! Please upload an image file.");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !rate || !image) return alert("All fields are required!");

    const formData = new FormData();
    formData.append("category", category);
    formData.append("name", name);
    formData.append("rate", rate);
    formData.append("image", image);

    try {
      const response = await addItem(formData);
      setItems((prevItems) => ({
        ...prevItems,
        [category]: [...prevItems[category], response.data.newItem],
      }));
      alert("Item added successfully!");
      setName("");
      setRate("");
      setImage(null);
      setImagePreview("");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Check console for details.");
    }
  };

  const handleDelete = async (category, id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(category, id);
        setItems((prevItems) => ({
          ...prevItems,
          [category]: prevItems[category].filter((item) => item.id !== id),
        }));
        alert("Item deleted successfully!");
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Check console for details.");
      }
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <h2>Admin Panel</h2>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="temper">Temper</option>
            <option value="headphone">Headphone</option>
            <option value="power">Powerbank</option>
            <option value="charger">Charger</option>
            <option value="window">Windows</option>
            <option value="estra">Estrafiting</option>
            <option value="others">Others</option>
          </select>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Rate"
            required
          />
          <input
            id="fileInput"
            className="image-choose"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" width="100" />
              <button type="button" onClick={handleRemoveImage}>Remove Image</button>
            </div>
          )}
          <button type="submit">Add Item</button>
        </form>
      </div>

      <div className="delete-item">
        <h2>Stored Items</h2>
        {["temper", "headphone", "power", "charger", "window", "estra", "others"].map((cat) => (
          <div key={cat}>
            <h6>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h6>
            <ol>
              {items[cat] && items[cat].length > 0 ? (
                items[cat].map((item) => (
                  <li key={item.id}>
                    <p>{item.name} - ₹{item.rate}</p>
                    <img src={item.image} alt={item.name} />
                    <button onClick={() => handleDelete(cat, item.id)}>Delete</button>
                  </li>
                ))
              ) : (
                <p style={{ color: "var(--gold)" }}>No items available.</p>
              )}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;