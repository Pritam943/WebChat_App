// end point for registration and install express

const express = require("express");
const mongoose = require("mongoose");

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

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { username, passsword } = req.body;
  
  try{
    const createdUser = await User.create({ username, passsword });
    jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).status(201).json({
        _id: createdUser._id,
      });
    });
  }
  catch(err) {
    if(err) throw err;
    res.status(500).json('error');
  }
  
});

app.listen(4040);

//WebChat9437
//RRMlFkdTuJlaOHxe