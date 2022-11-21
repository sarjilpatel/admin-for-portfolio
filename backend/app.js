const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config({ path: "backend/configs/config.env" });

var cors = require("cors");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/adminRoutes");

app.use("/api/v1", projectRoutes);
app.use("/api/v1", userRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
