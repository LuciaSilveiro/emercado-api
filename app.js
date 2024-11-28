const express = require('express');
const cors = require('cors')
const path = require('path');
const fs = require('fs');


const app = express();

app.use(cors())

const puerto = 3000;

app.get('/cats',(req, res)=>{
    const filePath = path.join(__dirname,'emercado-api-main/emercado-api-main/cats/cat.json');
    res.sendFile(filePath)
})

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
    });

    