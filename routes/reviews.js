//EXPRESS
const express = require("express");
const router = express.Router({ mergeParams: true });

// UTILITIES
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");
const {
    validateReview,
    isLoggedIn,
    isReviewAuthor,
} = require("../utilities/middleware");

//MODELS, VIEWS, CONTROLLERS
const reviews = require("../controllers/reviews")

// ROUTES
router.post(
    "/",
    isLoggedIn,
    validateReview,
    catchAsync(reviews.newReview)
);

router.delete(
    "/:reviewId",
    isLoggedIn, isReviewAuthor,
    catchAsync(reviews.deleteReview)
);

//EXPORT
module.exports = router;
