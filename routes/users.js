//EXPRESS
const express = require("express");
const router = express.Router();
const passport = require("passport");

// UTILITIES
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");
const { storeReturnTo } = require("../utilities/middleware");

// MODELS, VIEWS, CONTROLLERS
const User = require("../models/user");
const users = require("../controllers/users");

// ROUTES
router
    .route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.newUser));

router
    .route("/login")
    .get(users.renderLogin)
    .post(
        storeReturnTo,
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
        }),
        users.loginUser
    );

router.get("/logout", users.logoutUser);

module.exports = router;
