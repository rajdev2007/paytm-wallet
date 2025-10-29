const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware")
const router = express.Router();


const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})
router.post("/signup", async (req, res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if (!success){
        return res.json({
            msg: "Email already taken / Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: body.username
    })
    if (user) {
        return res.json({
            msg: "Email already taken / Incorrect inputs"
        })
    }
    const dbUser = await User.create(body);
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET)
    res.json({
        msg: "User created successfully",
        token: token
    })
})

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})
router.post("/signin", async(req, res)=>{
    const body = req.body;
    const { success } = signinSchema.safeParse(req.body)
    if (!success){
        res.json({
            msg: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }
    res.json({
        msg: "User dosen't exist"
    })
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})
router.post("/update", authMiddleware, async(req, res)=>{
    const {success} = updateSchema.safeParse(req.body)
    if (!success){
        res.json({
            msg: "Error while updating information"
        })
    }
    await User.updateOne(
        { _id: req.userId },
        {$set: req.body})
    
    res.json({
        msg: "Updated successfully"
    })
})

module.exports = router;