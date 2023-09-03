import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      isAuth?: boolean;
      userId?: string; 
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
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
    const decodedToken = jwt.verify(token, key!) as JwtPayload;;
    req.isAuth = true;
    req.userId = decodedToken.userId 
  } catch (err) {
    req.isAuth = false;
  }

  return next();
}
