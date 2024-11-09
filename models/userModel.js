const { trace } = require('../routers/userRouter')
const userShema = require('./userShema')
const bcrypt=require('bcryptjs')

const User =class{
    // username;
    // name;
    // email;
    // password;
    constructor({email,username,password,name}){
        this.username=username
        this.name=name
        this.email=email
        this.password=password
    }
    fun1(params){
        
    }
    registerUser(){
    return new Promise( async(resolve, reject) => {
        const hashedpassword =await bcrypt.hash(this.password,Number(10));
      const userObj=new userShema({
        name:this.name,
        email:this.email,
        password:hashedpassword,
        username:this.username

      })
      try {
         const userDb=await userObj.save()
        resolve (userDb);
      } catch (error) {
        reject(error);
      }
    })
    }
    static emailAndUsernameExist({username,email}){
        return new Promise(async(resolve, reject) => {
         try {
            const userDb=await  userShema.findOne({
                $or:[{username},{email}]
            })
            if(userDb && email===userDb.email) reject("email already exist")
                if(userDb && username===userDb.username) reject("username already exist")
           console.log("hrllo",userDb);
            resolve(userDb)
         } catch (error) {
            reject(error);
         }
        })
    }
    static emailAndUsernameExist({username,email}){
        return new Promise(async(resolve, reject) => {
         try {
            const userDb=await  userShema.findOne({
                $or:[{username},{email}]
            })
            if(userDb && email===userDb.email) reject("email already exist")
                if(userDb && username===userDb.username) reject("username already exist")
           console.log("hrllo",userDb);
            resolve(userDb)
         } catch (error) {
            reject(error);
         }
        })
    }




    static findUserWithLoginid({ loginId }) {
        return new Promise(async (resolve, reject) => {
            try {
                const userDb = await userShema.findOne({
                    $or: [{ username: loginId }, { email: loginId }]
                });
                
                if (!userDb) return reject("User not found");
                resolve(userDb);
            } catch (error) {
                reject(error);
            }
        });
    }
    

}
module.exports=User;