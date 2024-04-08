// example ha

const jwt = require("jsonwebtoken");

// const user = {
//   id: 1,
//   username: "deepak",
// };
// // gernate jwt token
// const token = jwt.sign(user, "secret_key", { expiresIn: "1h" });
// console.log("my token is", toke);

//. 2

// const token = "recive jwtToken";
// jwt.verify(token, "secret_key", function (err, decode) {
//   if (err) {
//     console.log("invalid token");
//   } else {
//     console.log("decode token", decode);
//   }
// });

//.3

app.post("/refreshtoken", (req, res) => {
  try {
    // const expireToken = req.body.token;
    const refreshToken = req.body.refreshToken;
    jwt.verify(refreshToken, "secretkey", function (err, decode) {
      if (err) {
        return res.status(403).json({ message: "invalid Token" });
      }
      // gernate newToken
      const newToken = jwt.sign(user, "jwtScretkey", { expiresIn: "1h" });
      // send new Token to client
      res.json({ token: newToken });
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "internal server error" });
  }
});
