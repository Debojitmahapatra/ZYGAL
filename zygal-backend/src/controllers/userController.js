const userModel=require("../models/userModel")

const jwt=require("jsonwebtoken")

const email = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,3}$/;

const isValid = function (value) {
    if(value === "") {return false}
    if( typeof value === 'undefined' || value === null) { return false; }
    if( typeof value    === 'string' && value.trim().length === 0) { return false; } 
    return true;
}


module.exports.loginUser = async function (req, res) {
    try {
   
      let email_id = req.body.email_id;
      let password = req.body.password;

    if (!isValid(email_id)) { return res.status(400).send({ status: false, message: "Please enter your email_id" }) }
    if(!email.test(email_id)){
        return res.status(400).send({ status: false, message: "Please enter a valid email" })
    }
    if (!isValid(password)) { return res.status(400).send({ status: false, message: "Please enter your password" }) }
    
  
      let user = await userModel.findOne({ email_id: email_id})
      data={email_id,password}
      if (!user){ 
        let createUser=await userModel.create(data)
        let token = jwt.sign({
              userId: createUser._id.toString(),
            },
            "debojit-security", { expiresIn: '2d' }
          );
          console.log(user)

          res.setHeader("authorization", token);
          return res.status(200).send({ status: true,createUser,auth: token, message:"Login Successfull" });
    }
    let User = await userModel.findOne({ email_id: email_id, password: password }).select("-password")
      
    if (!User){
      return res.status(400).send({
        status: false,
        message: "username or the password is not corerct",
      });}
        
        
      let token = jwt.sign(
        {
          userId: User._id.toString(),
  
        },
        "debojit-security", { expiresIn: '2d' }
      );
      res.setHeader("authorization", token);
      res.status(200).send({ status: true,User,auth: token, message:"Login Successfull" });
    }
    catch (err) { 
      res.status(500).send({ message: "Error", error: err.message })
    }
  }

