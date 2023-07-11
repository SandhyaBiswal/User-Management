const express=require('express');
const app=express();
const mongoose=require('mongoose')
PORT= 4050
const cors=require('cors')

app.use(cors())
app.use(express.json())

//db connection
mongoose.connect('mongodb+srv://admin:admin@cluster0.l5kfivk.mongodb.net/mernmongo').then(()=>{
    console.log("db connection successful");
})
.catch((err)=>{
    console.log(err)
})
//user schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


//user model
const User= mongoose.model('User',userSchema)

//read all user
app.get('/readalluser',async (req,res)=>{
    try{
      const userData= await User.find({});
      res.send(userData)
    }catch(error){
        res.send(error)

    }
})

//singleuserread
app.get("/read/:id",async (req, res)=>{
    try{
      const id = req.params.id;
      const user= await User.findById({_id: id});
      res.send(user);
    }catch (error){
        res.send(error);
    }
});
//updateuser
app.put("/updateuser/:id", async (req, res)=>{
    try{
      const id= req.params.id;
      const user = await User.findByIdAndUpdate({_id: id},req.body,{new: true});
      res.send(user)
    }catch (error){
     res.send(error)
    }
})
//delete user
app.delete("/deleteuser/:id", async(req,res)=>{
    try{
     const id=req.params.id;
     const user = await User.findByIdAndDelete({_id:id})
     res.send(user)
    }catch(error){
     res.send(error)
    }
})

app.get("/",(req,res)=>{
    res.send("from get route");
});

//createuser
app.post("/createuser",async(req,res)=>{
console.log(req.body);
 try{
 const bodyData=req.body;
 console.log(bodyData);
 const user=new User(bodyData)
 console.log(user);
 const userData=await user.save();
 res.send(userData);

 }catch(error){
  res.send(error)
 }
})



app.listen(PORT,()=>{
    console.log(`Server is running on... ${PORT}`)
})