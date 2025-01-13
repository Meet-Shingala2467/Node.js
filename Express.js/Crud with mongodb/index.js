const express = require('express');
const users = require('./models/userModel');
const port = 9000;
const app = express();

app.use(express.urlencoded());

app.post('/adduser',(req,res)=>{
    console.log(req.body);
})

userModel.create({
    username : name,
    useremail : email,
    userpassword: password,
})
then((r)=>{

console.log("user create");
    return res.redirect('/');
})
.catch((err)=>{
    console.log(err);
    return false;
})

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server start on https://localhost:${port}`);
    
})