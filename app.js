const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html");
});

app.get("/home",function(req,res){
    res.render("home");
});

app.get("/voter",function(req,res){
    res.render("voter");
});

app.get("/candidate",function(req,res){
    res.render("candidate");
});


app.get('/elections/:eleType',function(req,res){
    let  eleName = req.params.eleType;
    console.log(eleName);
    res.render("election",{eleName:eleName});
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
