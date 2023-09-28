const express = require('express')
const cors = require('cors')
const bobyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bobyParser.json());
app.use(bobyParser.urlencoded({ extended: true }));
app.use(cors())
//app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb+srv://api_recruit:As4TapTe768DOS68@recruitment.mos8yva.mongodb.net/?retryWrites=true&w=majority";

  app.get('/get_item', async(req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const items = await client.db('developer_exam').collection('item_data').find({},{}).toArray();
    await client.close();
    res.status(200).send({
      "status":"200" ,
      "message": "GET Successful",
      "data": items
    });
  })

  app.get('/get_item_by_id/:id', async(req, res) => {
    const id =req.params.id;
    var old = new ObjectId(id)
    const client = new MongoClient(uri);
    await client.connect();
    const item = await client.db('developer_exam').collection('item_data').findOne({"_id":old});
    await client.close();
    res.status(200).send({
      "status":"200" ,
      "message": "GET Item ID = " +id+ " Successful",
      "data": item
    });
  })

  app.post('/insert_item', async(req, res) => {
    const {name,price,quantity,description} = req.body;
    console.log(req.body)
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('developer_exam').collection('item_data').insertOne({
      name: name,
      price: price,
      quantity: quantity,
      description: description,
    });
    await client.close();
    res.status(200).send({
      "status": "200",
      "message": "Add New Item Successful",      
    });
  })

  app.put('/update_item/:id', async(req, res) => {
    const item = req.body;
    const id  = req.params.id;
    var old = new ObjectId(id)
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('developer_exam').collection('item_data').updateOne({'_id': old}, {"$set": {
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      description: item.description,
    }});
    await client.close();
    res.status(200).send({
      "status": "200",
      "message": "Item ID = "+id+" is updated",
    });
  })
