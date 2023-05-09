const express = require('express');
const app = express();
const cors = require('cors');

const port = 8000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('OMG IS THIS SHIT ACTUALLY WORKING?');
})

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
})