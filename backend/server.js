const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "300mb", extended: true }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "images");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const id = Date.now();
    req.generatedId = id;
    cb(null, `${id}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
      "image/webp",
      "image/bmp",
      "image/tiff",
    ];
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

const DATA_FILE = path.join(__dirname, "data.json");

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(
      {
        temper: [],
        headphone: [],
        power: [],
        charger: [],
        window: [],
        estra: [],
        others: [],
      },
      null,
      2
    ),
    "utf8"
  );
}

const readData = () => {
  try {
    const fileData = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return {
      temper: [],
      headphone: [],
      power: [],
      charger: [],
      window: [],
      estra: [],
      others: [],
    };
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing JSON file:", error);
  }
};

app.get("/items", (req, res) => {
  const data = readData();
  const imageDir = path.join(__dirname, "images");

  Object.keys(data).forEach((category) => {
    data[category] = data[category].map((item) => {
      let imageUrl = null;
      try {
        const files = fs.readdirSync(imageDir);
        const matchingFile = files.find((file) => file.startsWith(String(item.id)));
        if (matchingFile) {
          imageUrl = `http://localhost:5000/images/${matchingFile}`;
        } else {
          imageUrl = "http://localhost:5000/images/default.jpg";
        }
      } catch (error) {
        console.error(`Error reading images directory for item ${item.id}:`, error);
        imageUrl = "http://localhost:5000/images/default.jpg";
      }

      return {
        ...item,
        image: imageUrl,
      };
    });
  });

  res.json(data);
});

app.post("/add", upload.single("image"), (req, res) => {
  const { category, name, rate } = req.body;

  if (!category || !name || !rate || !req.file) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const data = readData();
  const newItem = { id: req.generatedId, name, rate };

  if (!data[category]) data[category] = [];
  data[category].push(newItem);

  writeData(data);

  res.json({ message: "Item added successfully!", newItem });
});

app.delete("/delete/:category/:id", (req, res) => {
  const { category, id } = req.params;
  const data = readData();

  if (!data[category]) return res.status(400).json({ error: "Invalid category" });

  const imageDir = path.join(__dirname, "images");
  fs.readdir(imageDir, (err, files) => {
    if (err) console.error("Error reading image directory:", err);
    const imageFile = files.find((file) => file.startsWith(id));
    if (imageFile) {
      const imagePath = path.join(imageDir, imageFile);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
  });

  data[category] = data[category].filter((item) => item.id !== parseInt(id));
  writeData(data);

  res.json({ message: "Item deleted successfully!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));