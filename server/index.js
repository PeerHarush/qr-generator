import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;
  app.use(cors({
  origin: ["http://localhost:3000", "https://qr-generator-theta-virid.vercel.app/"],
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

app.post("/generate", (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send("Missing URL");
  }


  // יצירת QR
  const qrImage = qr.image(url, { type: "png" });

  fs.writeFile("URL.txt", url, (err) => {
    if (err) console.error("Failed to save URL:", err);
  });

  // שליחת תמונת QR ללקוח
  res.setHeader("Content-Type", "image/png");
  qrImage.pipe(res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
