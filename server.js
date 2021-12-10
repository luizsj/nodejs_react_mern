const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const app = express();
const port = process.env.PORT || 8080
app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "hello world"});
});

app.listen(port, () => {
    console.log('server running on port '+port)
});