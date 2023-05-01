const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://prakhar29jain:5HTARUelQIPlohzF@personalprojects.jainvve.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html");    
});

app.get("/home",function(req,res){
    async function run() {
        try {
            const database = client.db("CandidateDB");
            const candidateData = database.collection("Elections");
    
            // Query for a cadidate with parameters
            const query = {};
    
            const options = {
            // sort: { "imdb.rating": -1 },
            projection: { _id: 0},
            };
    
            const cursor = candidateData.find(query, options);
            // print a message if no documents were found
            if ((await candidateData.countDocuments(query)) === 0) {
                console.log("No documents found!");
              }
    
            // since this method returns the matched document, not a cursor, print it directly
            const allValues = await cursor.toArray();
            res.render("home",{ allValues:allValues});
        } finally {
            //await client.close();
        }
        }
        run().catch(console.dir);
    
});

app.post("/home",function(req,res){
    let nameEel = req.body.electionName;
    let descriptionEle = req.body.electionDescription;
    async function run() {
        try {
            const database = client.db("CandidateDB");
            const candidateData = database.collection("Elections");
            // create a document to insert
            const doc = {
            Name: nameEel,
            description: descriptionEle,
            }
            const result = await candidateData.insertOne(doc);
        } finally {
            //await client.close();
        }
        }
        run().catch(console.dir);
        res.redirect("home");

});

app.get("/voter",function(req,res){
    res.render("voter");
});

app.get("/candidate",function(req,res){
    async function run() {
        try {
            const database = client.db("CandidateDB");
            const candidateData = database.collection("Candidates");
    
            // Query for a cadidate with parameters
            const query = {};
    
            const options = {
            // sort: { "imdb.rating": -1 },
            projection: { _id: 0},
            };
    
            const cursor = candidateData.find(query, options);
            // print a message if no documents were found
            if ((await candidateData.countDocuments(query)) === 0) {
                console.log("No documents found!");
              }
    
            const allValues = await cursor.toArray();
            //console.log(allValues[i].name);
            res.render("candidate",{allValues:allValues});
        } finally {
            //await client.close();
        }
        }
        run().catch(console.dir);
});


app.get('/elections/:eleType',function(req,res){
    var  eleName = req.params.eleType;
    res.render("election",{eleName:eleName});
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
});

