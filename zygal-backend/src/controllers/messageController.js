const messageModel=require("../models/messageModel")
const userModel=require("../models/userModel")

const mongoose=require("mongoose")

const isValidObjectId=function(data){
    return mongoose.isValidObjectId(data);
}
module.exports.createMessage = async function (req, res) {
    try {
        const userId = req.params.userId
        const message = req.body.message
        if(!isValidObjectId(userId)){
            return res.status(400).send({ status: false, message: "Please enter valid userId" })
        }
        let user=await userModel.findOne({_id:userId})
       if(!user){
        return res.status(404).send({ status: false, message: "user not found" })
       }
       
        let findMessage=await messageModel.findOne({message:message})
            if(findMessage){return res.status(400).send({ status: false, message: "this message is already entered" })}
        let messageData= await messageModel.create({userId,message})
        return res.status(201).send({ status: true, message: "Success", data: messageData })
        
    
}
catch (error) {
    res.status(500).send({ status: false, message: error.message })
}
}

module.exports.getMessage = async function (req, res) {
    try {
        const userId = req.params.userId
        if(!isValidObjectId(userId)){
            return res.status(400).send({ status: false, message: "Please enter valid userId to show all messages" })
        }
        let findMessage=await messageModel.find({userId:userId})
        return res.status(200).send({ status: true, message: "Success", data: findMessage })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
    }

    module.exports.updateMessage = async function (req, res) {
        try {
            const userId = req.params.userId
            if(!isValidObjectId(userId)){
                return res.status(400).send({ status: false, message: "Please enter valid userId to show all messages" })
            }
            let findMessage=await messageModel.updateMany({userId:userId},{isDeleted:true}, { new: true})
            return res.status(200).send({ status: true, message: "Success"})
        }
        catch (error) {
            res.status(500).send({ status: false, message: error.message })
        }
        }