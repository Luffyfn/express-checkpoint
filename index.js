// index.js

                        /* Required External Modules */

const express = require("express");
const path = require("path");

                        /* App Variables */

const app = express();
const port = process.env.PORT || "8000";
                        
                        /* App Configuration */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

                        /* Middelware Definitions */

var requestTime = function (req, res, next) {
    const date = new Date();
    const day = date.getDay();
    const hour =date.getHours();

    (hour > 8 && hour < 17 && day > 0 && day < 6) ? req.requestTime = true : req.requestTime = false; 
    console.log(req.requestTime);
    next();
  }
    
  app.use("*",requestTime);

                        /* Routes Definitions */

app.get("/", (req, res) => {
    res.render("index", { title: "Home", isOpen : req.requestTime });
});

app.get("/ourServices", (req, res) => {
    res.render("ourServices", { title: "Our Services", isOpen : req.requestTime });
});

app.get("/contactUs", (req, res) => {
    res.render("contactUs", { title: "Contact Us", isOpen : req.requestTime });
});
                        /* Server Activation */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});