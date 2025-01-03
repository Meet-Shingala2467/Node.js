const express = require("express");

const port = 9000;

const app = express();

app.set("view engine", "ejs"); //to assign the setting name to value 
                              //view engine enables the server-side rendering of dynamic pages

app.get("/", (req, res) => {
  return res.render("Home");
  // res.end();
});

app.get("/contact", (req, res) => {
  return res.render("Contact");
  // res.end();
});

app.get("/product", (req, res) => {
  return res.render("Product");
  // res.end();
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`Server is running on http://localhost:${port}`);
});
