var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/goomblog_app", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// The Journal / Blog Entry Schema Definition
var entrySchema = mongoose.Schema({
    title: String,
    image: String,
    keyEvents: String,
    content: String,
    created: {type: Date, default: Date.now}
});

// The Journal / Blog Entry Model Definition
var Entry = mongoose.model("Entry", entrySchema);

// For Demonstration, creation of a new entry
// Entry.create({
//     title: "My First Steps as a Developer",
//     image: "https://www.brannonbeliso.com/wp-content/uploads/2014/05/Baby-steps.jpg",
//     keyEvents: "I created my first web application and named it Goomblog!",
//     content: "In order to get used to the RESTful pattern of writing web apps, I wrote my first web application! I named it Goomblog, combining the Korean word 'Ggwum' (which means 'dream') and the English word 'Blog', in hopes that people will feel inspired to pour the contents of their soul out onto these virtual pages to be kept safe."
// });

// Entry.create({
//     title: "Thoughts: Auroras Are Absolutely Awe-Inspiring",
//     image: "https://wallpapercave.com/wp/mVcZwOP.jpg",
//     keyEvents: "Auroras. Are. Awesome!",
//     content: "I discovered my love for the northern lights, also known as Aurora Borealis! Seeing them reminds me of the fireworks in Disneyland during Christmas season, and reminds me also of those early days in Minecraft when I build a lone castle atop a wintry mountain. Ahhhh... Those were the good ol' days."
// });

// Landing Page
app.get("/", function(req, res) {
    res.render("landing");
});

// Index Route
app.get("/entries", function(req, res) {
    Entry.find({}, function(err, allEntries) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {entries: allEntries});
        }
    });
});

// New Route
app.get("/entries/new", function(req, res) {
    res.render("new");
});

// Create Route
app.post("/entries", function(req, res) {
    // normally, we would specify an object as the first argument of Entry.create(), but we gave the inputs in the "new.ejs" 
    // names with the format: "entry[someName]". This made it so that req.body.entry is returned by the body-parser as an object.
    Entry.create(req.body.entry, function(err, createdEntry) {
        if (err) {
            console.log(err);
        } else {
            console.log(createdEntry);
            res.redirect("/entries");
        }
    });
});

// Show Route/Page
app.get("/entries/:id", function(req, res) {
    // req.params returns an object containing the key-value pairs of all the variables in the request url and their respective values
    var id = req.params.id;
    Entry.findById(id, function(err, foundEntry) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {entry: foundEntry});
        }
    });
});

// Edit Route/Page
app.get("/entries/:id/edit", function(req, res) {
    var id = req.params.id;
    Entry.findById(id, function(err, foundEntry) {
        if (err) {
            console.log(err);
        } else {
            res.render("edit");
        }
    });
});

// Update Route
app.put("/entries/:id", function(req, res) {
    var id = req.params.id;
    var newData = req.body.entry;
    Entry.findByIdAndUpdate(id, newData, function(err, foundEntry) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/entries/" + id);
        }
    });
});

// Destroy Route
app.delete("/entries/:id", function(req, res) {
    var id = req.params.id;
    Entry.findByIdAndRemove(id, function(err) {
        if (err) {
            res.redirect("/entries");
        } else {
            res.redirect("/entries");
        }
    });
});





app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Goomblog Server has Launched!");
});