require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())



app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000




app.get('/', async (req, res) => {
    res.send('quora portal server is running')
})

 
const uri = "mongodb+srv://quora-admin:qYLXjH0LV7wrSVIL@cluster0.cwkrobe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

        const postCollection = client.db('Quora-Clone').collection('postCollection')
        const answerCollection = client.db('Quora-Clone').collection('answerCollection')
        
        app.get('/questions', async (req, res) => {
            const query = {}
            const result = await postCollection.find(query).toArray()
            res.send(result)
        }) 
        app.get('/question/:id', async (req, res) => {
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const result = await postCollection.findOne(query)
            res.send(result)
        })

        app.get('/answers/:id', async (req, res) => {
            const id = req.params.id;
            const query = {questionId: id}
            const result = await answerCollection.find(query).toArray()
            res.send(result)
        })


        app.post('/question', async (req, res) => {
            const body = req.body
            const result = await postCollection.insertOne(body)
            res.send(result)
        })

        app.post('/answer', async (req, res) => {
            const body = req.body
            const result = await answerCollection.insertOne(body)
            res.send(result)
        })

        
        app.put('/comment/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $push: {
                   comments: req.body.comments
                }
            }
            const result = await postCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })


        app.put('/post-upvote/:id', async (req, res) => { 
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const options = {upsert: true}
            const updatedDoc = {
                $inc: {
                     upvote: req.body.upvote
                }
            }
            const result = await postCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })
        app.put('/upvote/:id', async (req, res) => { 
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const options = {upsert: true}
            const updatedDoc = {
                $inc: {
                     upvote: req.body.upvote
                }
            }
            const result = await answerCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })


        app.put('/post-downvote/:id', async (req, res) => { 
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const options = {upsert: true}
            const updatedDoc = {
                $inc: {
                     downvote: req.body.downvote
                }
            }
            const result = await postCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })


        app.put('/downvote/:id', async (req, res) => { 
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const options = {upsert: true}
            const updatedDoc = {
                $inc: {
                     downvote: req.body.downvote
                }
            }
            const result = await answerCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })




    }catch (error) {
        console.log(error);
    }


}

run().catch(console.log)





app.listen(port, () => console.log(`quora portal is running on ${port}`))