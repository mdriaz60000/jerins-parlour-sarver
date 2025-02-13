const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000


// middleware
app.use(cors())
app.use(express.json())

    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c6fbz7w.mongodb.net/?retryWrites=true&w=majority` ;
    console.log(uri)

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

    const customerCollection = client.db('jerinsParlour').collection('customerData')

    app.post('/customer',async (req, res)=>{
      const newCustomer= req.body
      console.log(newCustomer)
      const result = await customerCollection.insertOne(newCustomer)
      res.send(result)
    })

    app.get('/customer',async (req, res)=>{
      const result = await customerCollection.find().toArray()
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`jarin  ${port}`)
})