const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    console.log(newReview);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New review created");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview =  async (req, res) => {
    let { id, reviewID} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewID}});
    await Review.findById(reviewID);
    req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);
}; 