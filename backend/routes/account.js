const express = require("express");
const router = express.Router();
const { User, Account } = require("../db")
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async(req,res)=>{
    const account = await Account.findOne({
        userId: req.userId
    })
    
    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    
    const { amount, to } = req.body;

    const toUser = await User.findOne({username: to});
    if(!toUser){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            msg: "Receiver not found"
        })
    }

    const account = await Account.findOne({userId: req.userId}).session(session);
    if (!account || account.balance<amount){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            msg: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId: toUser._id}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            msg: "Invalid account"
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: toUser._id}, {$inc: {balance: amount}}).session(session);

    await session.commitTransaction();
    session.endSession();

    res.json({
        msg: "Transfer successful"
    })
})

 module.exports = router;