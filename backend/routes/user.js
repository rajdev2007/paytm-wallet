const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");
const bcrypt = require("bcryptjs");
const router = express.Router();

// ✅ Validation Schemas
const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

const loginSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

// ✅ Signup
router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);
    if (!success) {
      return res.status(400).json({ msg: "Incorrect inputs" });
    }

    const existingUser = await User.findOne({ username: body.username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const dbUser = await User.create({
      username: body.username,
      password: hashedPassword,
      firstname: body.firstname,
      lastname: body.lastname,
    });

    await Account.create({
      userId: dbUser._id,
      balance: Math.ceil(1 + Math.random() * 10000),
    });

    res.json({ msg: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// ✅ Signin
router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const { success } = loginSchema.safeParse(body);
    if (!success) {
      return res.status(400).json({ msg: "Incorrect inputs" });
    }

    const user = await User.findOne({ username: body.username });
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// ✅ Update user details
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ msg: "Invalid input format" });
    }

    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    await User.updateOne({ _id: req.userId }, { $set: updateData });

    res.json({ msg: "Profile updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ msg: "Error updating profile" });
  }
});

// ✅ Get logged-in user info
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    console.error("Fetch user error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// ✅ Search users (for transfer page)
router.get("/bulk", async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const safeFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const users = await User.find({
      $or: [
        { firstname: { $regex: safeFilter, $options: "i" } },
        { lastname: { $regex: safeFilter, $options: "i" } },
      ],
    });

    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.error("Bulk fetch error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
