const express = require('express');
const router = express.Router();
const {loginUser}=require("../controllers/userController")
const {createMessage,getMessage,updateMessage}=require("../controllers/messageController")
const {authentication}=require("../auth/auth")

router.post("/login",loginUser)
router.post("/message/:userId",createMessage,authentication)
router.get("/message/:userId",getMessage,authentication)
router.put("/message/:userId",updateMessage,authentication)
module.exports=router