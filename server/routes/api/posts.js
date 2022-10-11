const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GETPOST
router.get('/', async (req,res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
})

//ADDPOST
router.post('/', async (req,res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

//DELETE POST
router.delete('/:id', async (req,res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send();
})





async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect
    ('',{
        useNewUrlParser:true
    })
    
    return client.db('vue_express').collection('posts');
}

module.exports = router;