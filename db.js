const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://sachin:chavan@cluster0.1kuxcjb.mongodb.net/movieapi?retryWrites=true&w=majority")

// user schema for the document-->
const userSchema=mongoose.Schema({
    id:Number,
   img:String
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema)



module.exports={
    connection,
    UserModel
}