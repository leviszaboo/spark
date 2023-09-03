import jwt from "jsonwebtoken";

export function authenticate(req, _res, next) {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  try {
    const key = process.env.JWT_KEY;
    const decodedToken = jwt.verify(token, key);
    req.isAuth = true;
    req.userId = decodedToken.userId; 
  } catch (err) {
    req.isAuth = false;
  }

  return next();
}
