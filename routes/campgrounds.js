// REQUIRES
const express = require("express");
const router = express.Router();

// MODELS, VIEWS, CONTROLLERS
const campgrounds = require("../controllers/campgrounds");
const { validate } = require("../models/review");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// UTILITIES
const catchAsync = require("../utilities/catchAsync");
const {
    isLoggedIn,
    isAuthor,
    validateCampground,
} = require("../utilities/middleware");

// ROUTES
router
    .route("/")
    .get(catchAsync(campgrounds.renderIndex))
    .post(
        isLoggedIn,
        upload.array("campground[image]"),
        validateCampground,
        catchAsync(campgrounds.newCampground)
    );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
    .route("/:id")
    .get(catchAsync(campgrounds.renderShow))
    .put(
        isLoggedIn,
        isAuthor,
        upload.array("campground[image]"),
        validateCampground,
        catchAsync(campgrounds.editCampground)
    )
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
    "/:id/edit",
    isLoggedIn,
    isAuthor,
    catchAsync(campgrounds.renderEditForm)
);

//EXPORT
module.exports = router;
