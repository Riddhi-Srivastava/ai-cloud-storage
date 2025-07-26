import { Router } from "express";
import multer from "multer";
import { uploadFile, listFiles, deleteFile } from "../controllers/file.controller.js";

const router = Router();

// Store to local disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", listFiles);
router.delete("/:id", deleteFile);

export default router;
