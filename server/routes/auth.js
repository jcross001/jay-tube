import express from "express";
import { googleAuth, logout, signin, signup } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup);

//SIGN IN
router.post("/signin", signin);

//GOOGLE AUTH
router.post("/google", googleAuth);

//SIGN OUT
router.get("/logout", verifyToken, logout);

export default router;
