const express = require('express');
require('dotenv').config();
const app=express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port =process.env.PORT || 5001;
// middleware
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xzyjuex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    const database = client.db('ProductDB').collection('Products');
    
    app.post('/products',async(req,res)=>{
        const product =req.body;
        const result = await database.insertOne(product);
       
        res.send(result)
    })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// routes
app.get('/',(req,res)=>{
    res.send('Api is working...');
})

app.listen(port ,()=>{
    console.log(`server is running on the http://localhost:${port}`);
})