const jwt = require("jsonwebtoken");
require("dotenv").config;
const { SECRET_KEY } = require("../config");
// const SECRET_KEY = process.env.SECRET_KEY || "123supersecretkey4me";

const generateToken = (data) =>
  jwt.sign(data, SECRET_KEY, { expiresIn: "24h" });

const createUserJwt = (user) => {
  const payload = {
    email: user.email,
  };
  return generateToken(payload);
  // return generateToken(user);
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(err);
  }
};

// const testTokens = () => {
//   const user = { email: "person@gmail.com" };

//   const token = generateToken(user);
//   console.log("token", token);
//   const validatedToken = validateToken(token);
//   console.log("validated token", validatedToken);
// };

// testTokens();

module.exports = { generateToken, validateToken, createUserJwt };
