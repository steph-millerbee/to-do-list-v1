const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/views/date.js");
const day = require(__dirname + "/views/date.js"); //not used in code. day variable and associated function is purely for example purposes only

const app = express();

const items = [];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  
  const day = date.getDate();

  res.render("list", {listTitle: day, newToDoItems: items});

});

app.post("/", function(req, res) {

  const item = req.body.todoItem;
  
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newToDoItems: workItems});
});

app.get("/about", function(req, res) {
  res.render("about");
});


app.listen(3000, function() {
  console.log("Server is running on port 3000");
});