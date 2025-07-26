import path from "path";
import File from "../models/File.model.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const fileURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const doc = await File.create({
      originalName: req.file.originalname,
      storedName: req.file.filename,
      size: req.file.size,
      mimeType: req.file.mimetype,
      url: fileURL,
    });

    res.json({ message: "File uploaded", file: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const listFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await File.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    // (Optional) fs.unlinkSync(`uploads/${doc.storedName}`);
    res.json({ message: "Deleted", file: doc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
