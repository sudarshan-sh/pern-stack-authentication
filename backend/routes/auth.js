import express from "express";
import bcrypt from "bcryptjs"; // for hashing/encrypting the password (for security reasons)
import jwt from "jsonwebtoken";
import pool from "../config/db.js"; // connection pool for write/read data to/from Postgres

const router = express.Router(); // create a router instance using express framework

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict", // to prevent CSRF attacks
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// it signs the token with the user id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// +++++define/create individual endpoints+++++

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all the fields" });
  }

  const userExists = await pool.query("SELECT * from users where email = $1", [
    email,
  ]);

  if (userExists.rows.length > 0) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // 10 means number of times the cryptographic hashing algorithm loops in the background (higher the number, the more secure the hash becomes)
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`,
    [name, email, hashedPassword],
  );

  const token = generateToken(newUser.rows[0].id);

  // store token in the cookie that would get set in the client's browser (so that user can stay logged in securely)
  res.cookie("token", token, cookieOptions);

  return res.status(201).json({ user: newUser.rows[0] });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields" });
  }

  const user = await pool.query("SELECT * from users where email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    return res.status(400).json({ message: "No user found!" });
  }

  const userData = user.rows[0];

  const isMatch = await bcrypt.compare(password, userData.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  const token = generateToken(userData.id);

  res.cookie("token", token, cookieOptions);

  res.json({
    user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    },
  });
});

// user info
router.get("/me", async (req, res) => {
  res.json(req.user);
  // return info of the logged in user from protect middleware
});

// logout
router.post("/logout", async (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  res.json({ message: "Logged out successfully!" });
});

export default router;
