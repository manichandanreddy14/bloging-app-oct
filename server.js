const express = require('express');
require('dotenv').config();
const clc=require('cli-color')
const session = require('express-session')
const mongodbSession=require('connect-mongodb-session')(session);
//contants
const app = express();
const PORT = process.env.PORT || 8000; // Provide a default value for PORT
const store =new mongodbSession({
    uri:'mongodb+srv://suddalamanichandanreddy62:mani_mani@cluster0.wcsw0.mongodb.net/oct-karanNew_BoliAppDb',
    collection:"session"
})
//file-imports
// const dbConfig=require('./configurations/db.config')
// const authRouter = require('./routers/authRouter');
const dbConfig = require('./configurations/db.config');
const UserRouter = require('./routers/userRouter');
const bodyParser=require('body-parser');
const { collection } = require('./models/userShema');
// const BlogRouter = require('./routers/articleRouter');
// app.get('/', (req, res) => {
//     return res.send("Server is up and running");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//auth/register
// app.use('/auth',authRouter)
app.use('/api/v1/user',UserRouter);
app.use(session({
    secret:"This is oct blog app",
    resave:false,
    saveUninitialized:false,
    store:store,
}))
// app.use('/api/v1/blog',BlogRouter)

app.use("/",(req,res)=>{
   
    
})


app.listen(PORT, async() => {
    await dbConfig();
    console.log(clc.yellowBright.underline(`Server is up and running at http://localhost:${PORT}`));
});
