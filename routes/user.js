const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
    .route("/signup")
    .get(userController.rendersignUpform)
    .post(wrapAsync(userController.signUp));

router
    .route("/login")  
    .get(userController.renderLoginform)
    .post(
        saveRedirectUrl, 
        passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), 
        userController.login
    );

router.get("/logout", userController.logout);

module.exports = router;