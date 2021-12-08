const express = require("express");
const cors = require("cors");
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect to the database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wh888.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("alpha-yard");
        const signUpUserCollection = database.collection("signUpUser");

        app.post('/signUpUser', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await signUpUserCollection.insertOne(user);
            res.send(result);
        })

    }

    finally {
        // await client.close();
    }
}
run().catch(console.dir)

// check the server is running or not
app.get("/", (req, res) => {
    res.send("Server running successfully");
});

app.listen(port, () => {
    console.log("listening on port", port);
});
