const mongoose=require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
let messageSchema=new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    message:{
        type: String,
        required: true,
        unique:true
      },
      isDeleted: {
        type: Boolean,
        default: false
    },
})

module.exports=mongoose.model("Message",messageSchema)