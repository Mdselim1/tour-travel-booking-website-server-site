const express = require('express');

const { MongoClient } = require('mongodb');

const app = express();
require('dotenv').config();

const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 8000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hf2pl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async () => {

    try {
        await client.connect();

        const database = client.db('Traveler');

        const travelCollection = database.collection('travelservices');

        // Find Data From Data Base 
        app.get('/travelservices', async (req, res) => {     
            const datafind = travelCollection.find({});
            const result = await datafind.toArray();
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