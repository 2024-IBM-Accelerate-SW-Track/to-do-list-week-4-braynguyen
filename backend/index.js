const express = require("express"),
       app = express(),
       port = process.env.PORT || 8080,
       cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs").promises;
const { MongoClient } = require('mongodb');
const { env } = require('node:process');

// setup (MONGODB)
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const collection = client.db('Accelerate').collection('test');

// setup (JSON)
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.listen(port, () => console.log("Backend server live on " + port));


env.DATABASE_TYPE = "MONGODB"

// api endpoints
app.get("/", (req, res) => {
    res.send({ message: "Connected to Backend server!" });
});

app.post("/add/item", addItem);


// helper functions
async function addItem (request, response) {
    try {
        // Converting Javascript object (Task Item) to a JSON string
        const id = request.body.jsonObject.id
        const task = request.body.jsonObject.task
        const curDate = request.body.jsonObject.currentDate
        const dueDate = request.body.jsonObject.dueDate
        const newTask = {
          ID: id,
          Task: task,
          Current_date: curDate,
          Due_date: dueDate
        }

        if (env.DATABASE_TYPE === "MONGODB") {
            await collection.insertOne(newTask);
            console.log('Successfully wrote to MongoDB') 
        } else {
            const data = await fs.readFile("database.json");
            const json = JSON.parse(data);
            json.push(newTask);
            await fs.writeFile("database.json", JSON.stringify(json))
            console.log('Successfully wrote to file') 
        }

        response.sendStatus(200)
    } catch (err) {
        console.log("error: ", err)
        response.sendStatus(500)
    }
}

