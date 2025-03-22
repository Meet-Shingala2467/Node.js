const express = require("express");
const port = 8080;
const app = express();

app.set("view engine", "ejs"); 

app.get("/", (req, res) => {
    return res.render("dashboard");
  });
  
app.get("/button", (req, res) => {
  return res.render("button");
});

app.get("/typography", (req, res) => {
    return res.render("typography");
  });

  
app.get("/typography", (req, res) => {
    return res.render("typography");
  });

  app.get("/element", (req, res) => {
    return res.render("element");
  });

  app.get("/404", (req, res) => {
    return res.render("404");
  });


app.get("/widget", (req, res) => {
  return res.render("widgets");
});

app.get("/table", (req, res) => {
  return res.render("table");
});

app.get("/form", (req, res) => {
  return res.render("form");
});

app.get("/element", (req, res) => {
  return res.render("element");
});

app.get("/chart", (req, res) => {
    return res.render("chart");
  });

  app.get('/signin',(req,res)=>{
    return res.render('signin');
})
app.get('/signup',(req,res)=>{
    return res.render('signup');
})

app.get('/footer',(req,res)=>{
    return res.render('footer');
})

const path = require("path");

app.use("/", express.static(path.join(__dirname, "public")));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`Server is starting on http://localhost:${port}`);
});
//login system
const passport = require('passport');
const passportLocal = require('./config/passportLocal');
const session = require('express-session');
app.use(session({
    name: 'rnw',
    secret: 'rnw4',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser)


//flash message start
const flash = require('connect-flash');
app.use(flash());
app.use('/', (req, res, next) => {
    res.locals.message = req.flash();
    return next();
})
//flash message end


app.use('/', require('./routes/indexRoute'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);

})