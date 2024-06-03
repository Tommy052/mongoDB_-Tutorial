const express = require("express");
const mongoose = require('mongoose');

const server = async() => {
  try{
    const MONGO_URL = "mongodb+srv://eheh34w:KGTE1tJFElnjfsbQ@cluster0.bho2lgx.mongodb.net/BlogService?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(MONGO_URL)
      .then(() => console.log('Connected!'));
    
    const app = express();
    
    app.use(express.json())
    
    app.get('/', (req,res)=>{
    
      res.send('<p>some html!!!</p>')
    
    })
    
    app.listen((3000),()=>{
      console.log("nodemon start");
    })
  
  }catch(err){
    console.log("fall : " , err);
  }

}
server()
