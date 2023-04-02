const express=require("express")
const {connection}=require("./db")
const {UserModel}=require("./db")
const cors=require("cors")


const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

//create
app.post("/adduser",async (req,res)=>{
    const payload=req.body
    try {
        const user=new UserModel(payload)
        await user.save()
        res.status(200).send({"msg":"New user has been added"})
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})

//Read
app.get("/users",async (req,res)=>{
    const query=req.query
    try {
        const users=await UserModel.find(query)
        res.status(200).send(users)
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})

//Update
app.patch("/updateuser/:id",async (req,res)=>{
    const {userID}=req.params.id
    const payload=req.body
    try {
        await UserModel.updateOne({id:userID},payload)
        res.status(200).send({"msg":"The user details has been updated"})
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})


//Delete
app.delete("/deleteuser/:id",async (req,res)=>{
    const id=req.params.id
    try {
        await UserModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"user has been deleted"})
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})


app.listen(8080, async()=>{
    try{
       await connection
        console.log("Connected to DB");
    }catch(err){
        console.log("Not able to connect to Mongo");
        console.log(err);
    }
    console.log("server is running on port 8080");
})