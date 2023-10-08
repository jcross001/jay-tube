import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User Created");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User Not Found!"));
    }
    const pwMatch = await bcrypt.compare(req.body.password, user.password);
    if (!pwMatch) {
      return next(createError(400, "Wrong Credentials"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWTKEY);
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWTKEY);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({ ...req.body, fromGoogle: true });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWTKEY);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
}

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("logged out");
  } catch (err) {
    next(err);
  }
}