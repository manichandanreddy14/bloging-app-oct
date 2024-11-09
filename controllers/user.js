
const { response } = require("express");
const User = require("../models/userModel");
const { userDataValidation } = require("../untils/authUntils");
const bcrypt=require('bcryptjs')
async function CreateUser(req, res) {
    const {name,email,username,password}=req.body;
    console.log(name);
    try {
        await userDataValidation({name,email,username,password});
        await User.emailAndUsernameExist({username,email})
    } catch (error) {
       console.log(error);
    }
      
        try {
            
          const userObj= new User({name,email,password,username})
         const userDb=  await userObj.registerUser();
         console.log(userDb);
         return res.send({
            status:201,
            message:"Register susscessfully",
            data:userDb
         })
        } catch (error) {
            return res.send({
                status:500,
                message:"internal server error"
            })
        }
}
const loginController = async (req, res) => {
    const { loginId, password } = req.body;
    console.log("1");
    
    // if (!loginId) {
    //     console.log("2");
    //     return res.send({
    //         status: 400,
    //         message: "Missing credentials",
    //     });
    // }
    
    try {
        const userDb = await User.findUserWithLoginid({ loginId });
       const isMatch=await bcrypt.compare(password,userDb.password)
       if(!isMatch){
        return res.send({
            status:400,
            Message:"Incorrect password",
        })
       }
       console.log(req.session);
        console.log(isMatch);
        return res.send({
            status:200,
            Message:"Login sussessfull",
        })
        // You might want to add further response handling here based on the userDb lookup
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
        });
    }
};


module.exports={CreateUser,loginController};
