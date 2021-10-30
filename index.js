const express = require('express');

const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId;

const app = express();
require('dotenv').config();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hf2pl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async () => {

    try {
        await client.connect();

        const database = client.db('Traveler');

        const travelCollection = database.collection('travelservices');
        const guideCollection = database.collection('guides');
        const orderCollection = database.collection('order');

        // Find Data From Data Base 
        app.get('/travelservices', async (req, res) => {     
            const datafind = travelCollection.find({});
            const result = await datafind.toArray();
            res.json(result);
        });

        // Find Guide From data base 
        app.get('/guides', async (req, res) => {
            const guidefind = guideCollection.find({});
            const guide = await guidefind.toArray();
            res.json(guide);
        });

        // Find Single Service Params 
        app.get('/travelservices/:id', async (req, res) => {  
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await travelCollection.findOne(query);
            res.json(result);
        });

        // Add Service Data Upload 
        app.post('/travelservices', async (req, res) => {
            const data = req.body;
            const insertdata = await travelCollection.insertOne(data);
            res.json(insertdata);
        });

        // Find Order Collection DAta 
        app.get('/order', async (req, res) => {
            const orderfind = orderCollection.find({});
            const order = await orderfind.toArray();
            res.json(order);
        });

        // Upload Order Collection 
        app.post('/order', async (req, res) => {
            const orderdata = req.body;
            const order = await orderCollection.insertOne(orderdata);
            res.json(order)
        });

        // For Update Manage Order data from data base 

        app.get('/order/:id', async (req, res) => {
            const id = req.params.id;
            const dataid = { _id: ObjectId(id) };
            const result = await orderCollection.findOne(dataid);
            res.send(result)
        })

        //Manage Orders Delete A Document 
        app.delete('/order/:id', async (req, res) => {
            const id = req.params.id;
            const deleteid = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(deleteid);
            res.json(result);
        });

        
    }
    finally {
        // await client.close();
    }
    
}
run().catch(console.dir)


app.get('/', (req, res) => {
    
    console.log('This is Travel Website');
    res.send('Server Is Running Travel Website')

});


app.listen(port, () =>{
   
    console.log(`This server is running http://localhost:${port}`);  
});