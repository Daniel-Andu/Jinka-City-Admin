const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { query } = require("./config/db");
const publicRoutes = require("./routes/publicRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = Number(process.env.PORT || 5001);

app.set("trust proxy", true);
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use('/uploads', express.static('uploads'));

app.get("/health", async (_req, res, next) => {
  try {
    const rows = await query("SELECT NOW() AS db_time");
    res.json({ ok: true, db: rows[0] });
  } catch (err) {
    next(err);
  }
});

app.use("/api/public", publicRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

app.use((err, _req, res, _next) => {
  const message = err && err.message ? err.message : "Internal server error";
  res.status(500).json({ error: message });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Jinka CMS backend running on port ${port}`);
});
