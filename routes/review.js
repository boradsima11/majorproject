const express=require("express");
const router = express.Router({mergeParams:true});//merge parent ,child ruote path
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");   //joi validation schema file
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//validate review
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);  //validate : This calls the validate method on the listingSchema object

    if (error) {  //If validation fails, it constructs a detailed error message and throws an error with a 400 status code.
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {  //If validation passes, it calls the next function to continue processing the request.
        next();
    }
};

//reviews - post route
router.post("/", validateReview, wrapAsync(async (req, res) => {
   
        let listing = await Listing.findById(req.params.id);

        let newReview = new Review(req.body.review);
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        console.log("new review save");


        res.redirect(`/listings/${listing._id}`);
    }
));

//delete review route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));

module.exports=router;