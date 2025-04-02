const express = require("express");
const port = 5800;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");
const mongodb = require("../nodejs final exam/config/db");
const path = require("path");
const app = express();
const isAuthenticated = require("./middleware/auth");
const flash = require("connect-flash");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = {
    error: req.flash("error"),
    success: req.flash("success"),
  };
  next();
});

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const checkoutRoutes = require("./routes/checkout");

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);

// Redirect root to login page
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

// Auth routes
app.get("/auth/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    messages: req.flash() || {},
    user: req.user || null,
  });
});

app.get("/auth/register", (req, res) => {
  res.render("auth/register", {
    title: "Register",
    messages: req.flash() || {},
    user: req.user || null,
  });
});

app.get("/", (req, res) => {
  res.render("index", {
    user: req.user || null, // Pass user data to the template
  });
});

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.listen(port, () => {
  console.log(`Server is running on port  http://localhost:${port}`);
});
