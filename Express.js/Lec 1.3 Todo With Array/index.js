const express = require("express");


const port = 9000;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded()); 
let record = [];

app.get("/", (req, res) => {
  return res.render("form");
   res.end();
});

app.get("/table", (req, res) => {
  return res.render("table",{
    record
  });
   res.end();
});

app.post('/adduser', (req, res) => {
    const { username, userphone } = req.body; // Correctly destructure req.body
    const obj = {
        name: username, 
        phone: userphone 
    };
    record.push(obj);
    res.redirect('/table'); 
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`Server is running on http://localhost:${port}`);
});
