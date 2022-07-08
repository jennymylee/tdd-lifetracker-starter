const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../utils/errors");

// extract the JWT from the request header
const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ");
    if (scheme.trim() === "Bearer") {
      return token;
    }
  }
  return undefined;
};

//attach the user to the res object
const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req);
    console.log("this is the token", token);
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }

    const test = res.locals.user;
    console.log("res.locals.user obj", test);
    return next();
  } catch (err) {
    return next(err);
  }
};

// verify an authed user exists
const requireAuthenticatedUser = (req, res, next) => {
  try {
    // const token = jwtFrom(req);
    // console.log("rau token", token);
    // if (token) {
    //   res.locals.user = jwt.verify(token, SECRET_KEY);
    // }
    console.log("req.headers.authorization", req.headers.authorization);
    const { user } = res.locals;
    // res.locals.user =
    console.log("res.locals user", user);
    if (!user?.email) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

// const validateToken = (req,res,next) => {
//   const auth = req.headers.authentication;
//   if (auth) {
//     const t = auth.split(" ")[1]
//     if (!t) {
//       throw
//     }
//   }
// }
module.exports = { extractUserFromJwt, requireAuthenticatedUser };
