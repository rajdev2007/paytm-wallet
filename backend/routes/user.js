const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
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
        return res.status(400).json({
            msg: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: body.username
    })
    if (user) {
        return res.status(400).json({
            msg: "Email already taken / Incorrect inputs"
        })
    }
    const dbUser = await User.create(body);
    const userId = dbUser._id;
    
    await Account.create({
        userId,
        balance: Math.ceil(1 + Math.random()*10000)
    })

    res.json({
        msg: "User created successfully"
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
        res.status(400).json({
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
            msg: "Login successful",
            token: token
        })
        return;
    }
    res.status(400).json({
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
        res.status(500).json({
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

router.get("/bulk", async(req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        },{
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router;