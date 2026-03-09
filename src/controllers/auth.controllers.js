import { hash } from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const registerController = async (req, res) => {
  const { email, userName, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "Please provide required fields",
    });
  }

  const alreadyExists = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (alreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashPass = await bcrypt.hash(password, 10);
  const createUser = await userModel.create({
    userName,
    email,
    password: hashPass,
  });

  const token = jwt.sign(
    { id: createUser._id, userName: createUser.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Created Successfully",
    user: {
      id: createUser._id,
      userName: createUser.userName,
      email: createUser.email,
    },
  });
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const checkEmail = await userModel.findOne({ email });
  if (!checkEmail) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const checkPassword = await bcrypt.compare(password, checkEmail.password);
  if (!checkPassword) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { id: checkEmail._id, userName: checkEmail.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token" , token);

  res.status(200).json({
    id : checkEmail._id,
    userName : checkEmail.userName,
    email : checkEmail.email 
  })
};

export { registerController, loginUserController };
