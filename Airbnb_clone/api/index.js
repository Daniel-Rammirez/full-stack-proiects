require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const app = express();
// rammirezdaniel
// 4ysTIbmrpD5mpcTQ
app.use(express.json());

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "randomStringForSecret";

app.use(cookieParser());
mongoose.connect(process.env.MONGO_URL);

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(newUser);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.get("/datos", async (req, res) => {
  // await UserModel.updateMany({ name: "Coni10" }, { name: "Coni" });
  // await UserModel.deleteOne({ email: "coni2@gmail.com" });
  const base = await UserModel.find();
  res.json({ base });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await UserModel.findOne({ email });
  if (!userDoc) return res.json("not found");
  const passwordCompare = bcrypt.compareSync(password, userDoc.password);
  if (!passwordCompare) return res.status(422).json("password not ok");

  jwt.sign(
    { email: userDoc.email, id: userDoc._id },
    jwtSecret,
    {},
    (err, token) => {
      if (err) throw err;
      res
        .cookie("token", token, { sameSite: "none", secure: "false" })
        .json(userDoc);
    }
  );
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.json(null);
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { name, email, _id } = await UserModel.findById(userData.id);
    res.json({ name, email, _id });
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logout");
});

app.listen(4000);
