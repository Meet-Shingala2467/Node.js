const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const isAuthenticated = require("../middleware/auth");
const Cart = require("../models/Cart");
const fs = require("fs");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
});

// Show create product form
router.get("/create", isAuthenticated, (req, res) => {
  try {
    res.render("products/create", {
      title: "Add New Product",
      user: req.user,
      path: "/products/create",
      messages: {
        error: req.flash("error"),
        success: req.flash("success"),
      },
    });
  } catch (error) {
    req.flash("error", "Error loading create form");
    res.redirect("/products");
  }
});

// Handle product creation
router.post(
  "/create",
  isAuthenticated,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("Please upload an image");
      }

      const { name, description, price, qty } = req.body;
      const image = `/uploads/${req.file.filename}`;

      const product = new Product({
        name,
        description,
        price,
        qty,
        image,
      });

      await product.save();
      req.flash("success", "Product added successfully");
      res.redirect("/products");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/products/create");
    }
  }
);

// Get all products (move this route to the top)
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products/index", {
      title: "Products",
      products: products,
      user: req.user,
      path: "/products",
      messages: {
        error: req.flash("error"),
        success: req.flash("success"),
      },
    });
  } catch (error) {
    req.flash("error", "Error loading products");
    res.redirect("/");
  }
});

// Show create product form
router.get("/create", isAuthenticated, (req, res) => {
  try {
    res.render("products/create", {
      title: "Add New Product",
      user: req.user,
      path: "/products/create",
      messages: {
        error: req.flash("error"),
        success: req.flash("success"),
      },
    });
  } catch (error) {
    req.flash("error", "Error loading create form");
    res.redirect("/products");
  }
});

// Get edit form
router.get("/edit/:id", isAuthenticated, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/products");
    }
    res.render("products/edit", {
      product,
      user: req.user,
      path: "/products",
      messages: {},
    });
  } catch (error) {
    req.flash("error", "Error fetching product");
    res.redirect("/products");
  }
});

// Get single product (move this route to the bottom of GET routes)
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/products");
    }
    res.render("products/show", {
      product,
      user: req.user,
      path: "/products",
      messages: {},
    });
  } catch (error) {
    req.flash("error", "Error fetching product");
    res.redirect("/products");
  }
});

// Handle update
router.post(
  "/update/:id",
  isAuthenticated,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, price, qty } = req.body;
      const updateData = {
        name,
        description,
        price,
        qty,
      };

      // Only update image if a new one is uploaded
      if (req.file) {
        updateData.image = "/uploads/" + req.file.filename;
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!product) {
        req.flash("error", "Product not found");
        return res.redirect("/products");
      }

      req.flash("success", "Product updated successfully");
      res.redirect("/products");
    } catch (error) {
      req.flash("error", "Error updating product");
      res.redirect(`/products/edit/${req.params.id}`);
    }
  }
);

// Delete product
router.post("/delete/:id", isAuthenticated, async (req, res) => {
  try {
    const productId = req.params.id;

    // First, remove product from all carts
    await Cart.updateMany({}, { $pull: { items: { productId: productId } } });

    // Then delete the product
    const result = await Product.findByIdAndDelete(productId);

    if (!result) {
      req.flash("error", "Product not found");
      return res.redirect("/products");
    }

    // If there's an image, you might want to delete it from the uploads folder
    if (result.image) {
      // Remove the image file from uploads folder
      const imagePath = path.join(__dirname, "../public", result.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    // Delete was successful
    req.flash("success", "Product deleted successfully");
    return res.redirect("/products");
  } catch (error) {
    console.error("Delete error:", error);
    req.flash("error", "Failed to delete product");
    return res.redirect("/products");
  }
});

module.exports = router;
