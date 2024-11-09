const express =require('express');
const {CreateUser,loginController} = require('../controllers/user');
// const { authorizeRoles } = require('../middaelware/authMiddleware');






const UserRouter=express.Router();

UserRouter.post('/create',CreateUser)

/UserRouter.post('/login',loginController)
// UserRouter.get('/getUsers',authorizeRoles("ADMIN"),GetUsers)
// UserRouter.post('/login',loginUser)
module.exports=UserRouter;