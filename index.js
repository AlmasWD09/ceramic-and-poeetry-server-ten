
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000



// middleware
app.use(cors())
app.use(express.json())

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
    
    // ===============  =================

    app.get('/categories',async(req,res)=>{
      const dataBase = ceramicesPotteryCollection.find();
      const result = await dataBase.toArray();
      res.send(result) 
    })


    app.post('/categories', async (req, res) => {
      const newCategory = req.body
      const result = await ceramicesPotteryCollection.insertOne(newCategory)
      res.send(result)
    })
    // ===============  =================

    // =============== user related api part start =================

    // =============== user related api part end ===================






    const ceramicesPotteryCollection = client.db("ceramicPotteryDB").collection('ceramicesPottery');
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