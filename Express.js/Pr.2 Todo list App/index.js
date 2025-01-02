

const express = require("express");

const port = 9000;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded());
let record = [];

app.get("/", (req, res) => {
  return res.render("form");
});

app.get("/table", (req, res) => {
  return res.render("table", {
    record,
  });
});

app.post("/adduser", (req, res) => {
  const { username, userphone, userstatus, userdeadline } = req.body; // Destructure additional fields
  const obj = {
    id : Math.floor(Math.random()*10000),
    name: username,
    phone: userphone,
    status: userstatus,
    deadline: userdeadline,
  };
  record.push(obj);
  res.redirect("/table");
});

app.get('/deletuser',(req,res)=>{
  let id = req.query.deletId
  let deletdata = record.filter(val=>val.id !=id);
  record=deletdata;
  return res.redirect('/');
})

app.get('/edituser',(req,res)=>{
  let id =req.query.editId
  let single = record.find(val=>val.id ==id);
  return res.render('edit',{
      single
  })
})

app.post('/updateuser',(req,res)=>{
  const { username, userphone, userstatus, userdeadline,editid } = req.body;
  let up = record.map((val)=>{
      if(val.id==editid){
          val.name= username;
          val.phone=userphone;
          val.status=userstatus;
         val.deadline=userdeadline;
   
      }
      return val;
  })

  record = up;
  return res.redirect('/table');

})

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`Server is running on http://localhost:${port}`);
});
