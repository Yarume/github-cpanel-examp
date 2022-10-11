const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const post = require('./routes/api/posts');

app.use('/api/posts', post);

//production

if(process.env.NODE_ENV === 'production'){
    //static folder
    app.use(express.static(__dirname, + '/public'))
    //spa
    app.get(/.*/ , (req,res) => res.sendFile(__dirname + '/public/index.html'))
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server starting on port ${port}`));
