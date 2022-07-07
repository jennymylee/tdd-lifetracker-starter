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
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

// verify an authed user exists
const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals;
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
