// end point for registration and install express

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

//import and configure dotenv:
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User");

dotenv.config();
// console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;

  if(token){
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if(err) throw err;
      res.json(userData);
    });
  }
  else{
    res.status(401).json('no token');
  }
  
});

app.post("/register", async (req, res) => {
  const { username, passsword } = req.body;

  try {
    const createdUser = await User.create({ username, passsword });
    jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token, {sameSite:'none', secure:true}).status(201).json({
        id: createdUser._id,
      });
    });
  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
});

app.listen(4044);

//WebChat9437
//RRMlFkdTuJlaOHxe
