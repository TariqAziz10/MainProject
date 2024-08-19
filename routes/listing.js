const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedIN, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isloggedIN, 
        upload.single('listing[image]'),
        validateListing, 
        wrapAsync(listingController.createListing)
    );

//new route
router.get("/new", isloggedIN, listingController.renderNewForm);


router
    .route("/:id")
    .get(wrapAsync(listingController.ShowListing))
    .put(
        isloggedIN, 
        isOwner, 
        upload.single('listing[image]'),
        validateListing, 
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isloggedIN, 
        isOwner, 
        wrapAsync(listingController.destroyListing)
    );

//edit route
router.get(
    "/:id/edit", 
    isloggedIN, 
    isOwner, 
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;