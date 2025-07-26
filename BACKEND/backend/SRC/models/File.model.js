import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    originalName: String,
    storedName: String,
    size: Number,
    mimeType: String,
    url: String,          // e.g. http://localhost:5000/uploads/<file>
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
