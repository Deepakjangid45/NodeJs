const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./db.js");
const User = require("./MODELS/userSchema.js");

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// function auticateToken(req, res, next) {
//   const token = req.headers.authorization.split(" ")[1];
//   const { id } = req.body;
//   // console.log(token);

//   if (!token) {
//     // return res.status(401).json({ message: "Auth Erro" });

//     // 21 line k badle hum yhe bhi likh sakte ha
//     const error = new Error("Token Not Found");
//     next(error);
//   }
//   try {
//     const decode = jwt.verify(token, process.env.JWR_SECRET_KEY);
//     if (id && decode.id !== id) {
//       // return res.status(401).json({ messsage: "Token Auth Error" });
//       // 26 line ke badle hum yhe bhi kr sakte ha
//       const error = new Error("Invlid Token");
//       next(error);
//     }
//     req.id = decode;
//     next();
//   } catch (error) {
//     // console.log(error);
//     // res.status(500).json({ message: "Invalid Token" });

//     next(err);
//   }

//   // Difrent method
// }

function auticateToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("Token Not Found");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { id } = req.body;
    if (id && decode.id !== id) {
      throw new Error("Invalid Token");
    }

    req.id = decode;
    next();
  } catch (error) {
    next(error);
  }
}

app.get("/", function (req, res) {
  res.json({ message: "THE API IS WORKING" });
});

app.post("/register", async (req, res) => {
  try {
    const { password, email, age, gender, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ mesaage: "email allredy exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      password: hashPassword,
      email,
      age,
      gender,
    });
    await newUser.save();
    res.status(200).json({ message: "user register succefully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      // return res.status(401).json({ message: "Invalid cradactional" });
      const error = new Error("user deta note exist");
      next(error);
    }

    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "invalid cradactional" });
    }

    const accesstoken = jwt.sign(
      { id: existingUser._id },
      process.env.JWR_SECRET_KEY,
      { expiresIn: 20 }
    );

    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_REFERESH_SECRET_KEY
    );

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/referesh_token",
    });

    res.status(200).json({
      accesstoken,
      refreshToken,
      message: "user logedin succesfull]y",
    });
  } catch (error) {
    // res.status(400).json({ message: error.message });
    next(error);
  }
});

app.get("/getmyprofile", auticateToken, async (req, res) => {
  // const token = req.headers.authorization;
  // console.log("token", token);
  // res.status(200).json({ token });

  //. mainloig
  const { id } = req.body;
  const user = await User.findById(id);
  // password ko hide karne k liye
  user.password = undefined;
  res.status(200).json({ user });
});

//  FOR REFRESH TOKEN

app.get("/refresh_token", (req, res, next) => {
  const token = req.cookies.refreshToken;
  // res.send(token);

  if (!token) {
    const error = new Error("Token not Found");
    next(error);
  }

  jwt.verify(
    token,
    process.env.JWT_REFERESH_SECRET_KEY,
    async (err, decode) => {
      if (err) {
        const error = new Error("Invalid Token");
        next(error);
      }
      const id = decode.id;
      const existingUser = await User.findById(id);

      if (!existingUser || token !== existingUser.refreshToken) {
        const error = new Error("Invalid Toke");
        next(error);
      }
      const accesstoken = jwt.sign(
        { id: existingUser._id },
        process.env.JWR_SECRET_KEY,
        {
          expiresIn: "40",
        }
      );

      const refreshToken = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_REFERESH_SECRET_KEY
      );
      existingUser.refreshToken = refreshToken;
      await existingUser.save();
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/referesh_token",
      });

      res.status(200).json({
        accesstoken,
        refreshToken,
        message: "Token refreshed succesfully",
      });
    }
  );
});

// getBy Gender

app.post("/getbygender", async (req, res) => {
  const { gender } = req.body;
  const users = await User.find({ gender: gender });
  res.status(200).json({ users });
});

app.post("/sortuser", async (req, res) => {
  const { sortby, order } = req.body;

  const sort = { sortby: order };
  const users = await User.find().sort({ [sortby]: order });
  res.status(200).json({ users });
});

// ERROR HANDLING MIDDLEWARE

app.use((err, req, res, next) => {
  console.log("err middleware call", err);
  res.status(500).json({ message: err.mesaage });
});

app.listen(PORT, () => {
  console.log(`app is listen ${PORT}`);
});
