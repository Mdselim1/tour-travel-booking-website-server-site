const express = require('express');

const app = express();

const port = process.env.PORT || 8000;






app.get('/', (req, res) => {
    
    console.log('This is Travel Website');
    res.send('Server Is Running Travel Website')

});


app.listen(port, () =>{
   
    console.log(`This server is running http://localhost:${port}`);
    

});