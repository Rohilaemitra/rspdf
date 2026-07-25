const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const upload = multer({
  dest: "uploads/"
});

// Health Check
app.get("/", (req, res) => {
  res.send("ROHILA PDF API Running ✅");
});

// Upload API (अभी टेस्ट के लिए)
app.post("/upload", upload.single("pdf"), async (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "PDF not uploaded"
    });
  }

  res.json({
    success: true,
    filename: req.file.filename,
    original: req.file.originalname,
    message: "PDF Uploaded Successfully"
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Running on Port " + PORT);
});
