const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const isAuthenticated = require("../middleware/auth");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    if (!cart || cart.items.length === 0) {
      req.flash("error", "Your cart is empty");
      return res.redirect("/cart");
    }

    let total = cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    res.render("checkout/index", {
      cart,
      total,
      user: req.user,
      path: "/checkout",
    });
  } catch (error) {
    req.flash("error", "Error loading checkout");
    res.redirect("/cart");
  }
});

router.post("/place-order", isAuthenticated, async (req, res) => {
  try {
    const { address, city, state, zipCode, paymentMethod } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      shippingAddress: {
        address,
        city,
        state,
        zipCode,
      },
      paymentMethod,
      total: cart.items.reduce((sum, item) => {
        return sum + item.productId.price * item.quantity;
      }, 0),
    });

    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    req.flash("success", "Order placed successfully!");
    res.redirect("/orders");
  } catch (error) {
    req.flash("error", "Error placing order");
    res.redirect("/checkout");
  }
});

module.exports = router;
