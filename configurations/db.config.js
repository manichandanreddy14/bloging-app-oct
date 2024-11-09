const mongoose=require("mongoose");

function dbConfig(){


    mongoose.connect('mongodb+srv://suddalamanichandanreddy62:mani_mani@cluster0.wcsw0.mongodb.net/oct-karanNew_BoliAppDb',{
        useUnifiedTopology:true,
        useNewUrlParser:true,
    }).then(()=>{
        console.log("mongooDb sussfully conneted");
    }).catch((error)=>console.log(error));

}
//mogoose opinions/string opinions


module.exports=dbConfig;