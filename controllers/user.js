const User = require("../models/user");

module.exports.rendersignUpform = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async(req, res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({username, email});
        const resgisteredUser = await User.register(newUser, password);
        console.log(resgisteredUser);
        req.login(resgisteredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });
        
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginform = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success", "welcome back to wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "you succesfully logout!");
        res.redirect("/listings");
    })
};