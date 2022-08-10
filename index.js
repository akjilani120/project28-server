const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require ("cors")
require('dotenv').config()
app.use(cors())
app.use(express.json())
const corsConfig = {
    origin: true,
    credentials: true,
}

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fqpwyta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const userCollection = client.db("project28").collection("users");
        app.post("/users" , async(req , res) =>{
            const users = req.body
            console.log(users)
            const result = await userCollection.insertOne(users)
            res.send(result)
        })
    }finally{}

}
  run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Project 28 Company Hello world')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})