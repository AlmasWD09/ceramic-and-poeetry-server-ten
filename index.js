
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1kmrgvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
    const ceramicesPotteryCollection = client.db("ceramicPotteryDB").collection('ceramicesPottery');
    
    // ===============  =================

    // app.get('/', (req, res) => {
    //   res.send('GET request to the homepage')
    // })


    app.post('/', (req, res) => {
      res.send('POST request to the homepage')
    })
    // ===============  =================

    // =============== user related api part start =================

    // =============== user related api part end ===================

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// middleware
app.use(express.json())
app.use(cors())




app.get('/', (req, res) => {
  res.send('ceramices and pottery comming soon')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})