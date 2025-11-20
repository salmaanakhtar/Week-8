const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
let db;
 
// Express Initialization
app.use(express.json());
app.set('port', 3000);
 
// Ensure access is allowed under all circumstances
app.use ((request,response,next) => {
    next();
});
 
// Conect to MongoDB
MongoClient.connect("mongodb+srv://akhtarsalmaan0:akhtarsalmaan0@labs.tyokjdi.mongodb.net", (err, client) => {
    db = client.db("Week8");
}
);
 
// Display a message for root path to show that the API is working
app.get('/',(request, response, next) => {
    response.send('Select a collection, e.g. /collection/messages');
});
 
// Get collection name
app.param('collectionName', (request, response, next, collectionName) => {
    request.collection = db.collection(collectionName);
    return next();
});
 
// Retrieve all the objects from a collection
app.get('/collection/:collectionName', (request, response, next) => {
    request.collection.find({}).toArray((e, results) => {
        if (e) return next(e);
        response.send(results);
    });
});
 
// Post a new file into the DB - OPS is an Object Indetifier
app.post('/collection/:collectionName', (request, response, next) => {
    request.collection.insert(request.body, (e, results) => {
        if (e) return next(e);
        response.send(results.ops);
    });
});
 
const ObjectID = require('mongodb').ObjectID;
app.get('/collection/:collectionName/:id', (request, response, next) => {
    request.collection.findOne({_id: new ObjectID(request.params.id)}, (e, result) => {
        if (e) return next (e)
        response.send(result)
    });
});

port = process.env.PORT || 3000
 
app.listen(port, () => {
    console.log('Express.js server is running on localhost:3000');
});