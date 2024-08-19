const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isloggedIN, isreviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js");


//post reviews route
router.post("/", isloggedIN, validateReview, wrapAsync(reviewcontroller.createReview));

//delete review route
router.delete("/:reviewID", isloggedIN, isreviewAuthor, wrapAsync(reviewcontroller.destroyReview));

module.exports = router;