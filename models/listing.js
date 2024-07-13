const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
    },
    description:
    {
        type: String,
    },
    image:{
        filename: String,
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            set: function (v) {
                return v === "" ? "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" : v;
            }
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
        type: Schema.Types.ObjectId,//store review objid
        ref:"Review"//store review model
        }
    ]
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;