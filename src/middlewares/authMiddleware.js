import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blacklistModel.js";

const authMiddelware = async(req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }
  const isTokenBlacklist = await tokenBlacklistModel.findOne({token})
  if (isTokenBlacklist) {
    return res.status(401).json({
      message: "Token is invalid",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
  }
};

export default authMiddelware;
