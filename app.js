const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings =require("./routes/listing.js");
const reviews = require("./routes/review.js");

//connect to mongoose
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
// Set the view engine to ejs
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname, "views"));
//parse body data
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main()
    .then(() => {
        console.log("connetced to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(mongo_url);
}

app.get("/", (req, res) => {
    res.send("root");
});
//[nikalte he common path]
app.use("/listings",listings); //match 1st /listings in listings(require file_name)
app.use("/listings/:id/reviews",reviews);//match /l../:id/r. ke bad all path in review path

//* means all incoming req. sath match nah ho
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
})

app.use((err, req, res, nex) => {
    let { statuscode = 500, message = "something went wrong!" } = err;//set scode,msg as deflut this excute when page not any msg,code.
    res.status(statuscode).render("error.ejs", { message })
    //res.status(statuscode).send(message);
});

app.listen(8080, () => {
    console.log("server is listing on port 8080");
});

//utility middleware
/*
app.use((req,res,next)=>{
    req.ResponseTime=new Date(Date.now()).toString();
    console.log(req.method,req.ResponseTime);
    next();
})*/

//insert route
/* app.get("/testlisting",async(req,res)=>{
    let sampleListing=new Listing({
        title:"my new villa",
        description:"by the beach",
        price:1200,
        location:"canda",
        country:"india",
    });
    await sampleListing.save()
    .then(doc => console.log('Document saved:', doc))
    .catch(err => console.error('Error saving document:', err));
    console.log(sampleListing);
    res.send("sucessful");
}); */

