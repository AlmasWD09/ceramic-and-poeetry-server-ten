
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');
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
    const ceramicesPotteryCollection = client.db("ceramicPotteryDB").collection('ceramicesPottery');
    const sliderCollection = client.db("ceramicPotteryDB").collection('sliders');
    const artistPotteryCollection = client.db("ceramicPotteryDB").collection('artistPottery');
    const subCategoryCollection = client.db("ceramicPotteryDB").collection('subCategory');

    
    // ========== slider releate api part start ============
    app.get('/sliders',async(req,res)=>{
      const sliderData = sliderCollection.find();
      const result = await sliderData.toArray();
      res.send(result) 
    })
    // ========== slider releate api part end ==============



    // =============== ceramices and pottery related api part start =================
    app.get('/categories',async(req,res)=>{
      const dataBase = ceramicesPotteryCollection.find();
      const result = await dataBase.toArray();
      res.send(result) 
    })
    

    // app.get('/categories/:email',async(req,res)=>{
    // app.get('/categories/email/:email',async(req,res)=>{
    app.get('/categories/email/:email',async(req,res)=>{
      const userEmail = req.params.email
      const dataBase = ceramicesPotteryCollection.find()
      const result = await dataBase.toArray(userEmail)
      res.send(result)
      // console.log(result);
    })

   app.get('/categories/:id',async(req,res)=>{
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    const result = await ceramicesPotteryCollection.findOne(query)
    res.send(result)
    // console.log(result);
   })

    app.post('/categories', async (req, res) => {
      const newCategory = req.body
      const result = await ceramicesPotteryCollection.insertOne(newCategory)
      res.send(result)
    })

    app.delete('/categories/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await ceramicesPotteryCollection.deleteOne(query)
      res.send(result)
    })

    // {name,stockStatus,price,rating,customization,time,userName,userEmail,selectedCategory,description,photo}

    app.put('categories/:id',async(req,res)=>{
     const id = req.params.id
     const updateCategory = req.body

     const query = {_id: new ObjectId(id)}
      const options = { upsert: true };
      
      const category = {
        $set: {
          name:updateCategory.name,
          stockStatus:updateCategory.stockStatus,
          price:updateCategory.price,
          rating:updateCategory.rating,
          customization:updateCategory.customization,
          time:updateCategory.time,
          userName:updateCategory.userName,
          userEmail:updateCategory.userEmail,
          selectedCategory:updateCategory.selectedCategory,
          selectedCategory:updateCategory.name,
          description:updateCategory.description,
          photo:updateCategory.photo,
        },
      };
      const result = await ceramicesPotteryCollection.updateOne(query,category,options)
      res.send(result)
    })
    // =============== ceramices and pottery related api part end =================

    // ================ subCategorie related api part start ======================
    app.get('/subCategories',async(req,res)=>{
      const subCategorieData = subCategoryCollection.find();
      const result = await subCategorieData.toArray();
      res.send(result)
    })

    app.get('/subCategories/category/:subcategory',async(req,res)=>{
      const id = req.params.subcategory
      const subCategorieData = subCategoryCollection.find({subCategories:id});
      const result = await subCategorieData.toArray();
      res.send(result)
    })
    // ================ subCategorie related api part end ========================









    // =============== artistPottery related api part start =================
    app.get('/airtistPottery',async(req,res)=>{
      const airtistPotteryData = artistPotteryCollection.find();
      const result = await airtistPotteryData.toArray();
      res.send(result) 
    })



    // =============== artistPottery related api end ========================

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