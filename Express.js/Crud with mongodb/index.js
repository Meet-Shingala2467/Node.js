const express = require('express');
const userModel = require('./models/userModel');
const port = 9000;
const app = express();
const path=require('path');
app.set('view engine','ejs');
const db=require('./config/db');

app.use(express.urlencoded());

app.get('/',(req,res)=>{
    return res.render('form');
})

app.post('/adduser',(req,res)=>{
    const {name,email,password}=req.body;
    userModel.create({
        name : name,
        email : email,
        password: password,
    })
    then((r)=>{

        console.log("user create");
            return res.redirect('/');
        })
        
.catch((err)=>{
    console.log(err);
    return false;
})

})



app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server start on https://localhost:${port}`);
    
})