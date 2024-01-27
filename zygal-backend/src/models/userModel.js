const mongoose=require("mongoose")

let userSchema=new mongoose.Schema({
    email_id:{
        type: String,
        required: true,
        unique: true
      },
      password:{
        type: String,
        required: true,
      },
      
      

})

module.exports=mongoose.model("User",userSchema)