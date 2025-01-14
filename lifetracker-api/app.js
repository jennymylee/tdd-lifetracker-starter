const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const security = require("./middleware/security");
const { NotFoundError } = require("./utils/errors");
const authRoutes = require("./routes/auth");
const nutritionRoutes = require("./routes/nutrition");
const activityRoutes = require("./routes/activity");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requeseted-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use(security.extractUserFromJwt);

app.use("/auth", authRoutes);
app.use("/nutrition", nutritionRoutes);
app.use("/activity", activityRoutes);

app.get("/", async (req, res, next) => {
  res.status(200).json({ ping: "pong" });
});

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
