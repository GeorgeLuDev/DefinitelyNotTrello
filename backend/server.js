const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
PORT = process.env.port || 5000;

// database stuff
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/DNTDB';
const client = new MongoClient(url, {useUnifiedTopology: true});
client.connect();

// root api
app.get('/', (req,res) => 
{
    console.log('Root hit');
    res.send('API root is working')
});

//test api
app.get('/api/test', async (req,res) => 
{
    console.log('Test api hit');
    var test = 'THIS IS THE API TEST';

    // send result back
    var ret = {test: test};

    res.status(200).json(ret);

});

// get everything from database api
app.get('/api/database', async (req,res) => 
{
    console.log('Database api hit');

    var test = 'THIS IS THE DATABASE';
    var Users;
    var Boards;
    var Lists;
    var Cards;

    try
    {
        const db = client.db();
        Users = await db.collection('Users').find({}).toArray();
        Boards = await db.collection('Boards').find({}).toArray();
        Lists = await db.collection('Lists').find({}).toArray();
        Cards = await db.collection('Cards').find({}).toArray();
    }
    catch(e)
    {
        error = e.toString();
    }

    
    // send result back
    var ret = 
    {
        test: test,
        users: Users,
        boards: Boards,
        lists: Lists,
        cards: Cards
    };

    res.status(200).json(ret);

});

// --board api's--

// create user api
app.post('/api/SignUp', async (req,res) => 
{
    console.log('SignUp api hit');
    var error = '';

    // get incoming json and format
    const { firstName, lastName, email, password } = req.body;
    const newUser =
    {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        emailVerification: 0,
        childrenBoards: []
    }

    // do stuff with database
    try
    {
        const db = client.db();
        const result = await db.collection('Users').insertOne(newUser);
    }
    catch(e)
    {
      error = e.toString();
    }

    // send result back
    var ret = 
    {
        error: error
    };

    res.status(200).json(ret);

});

// verify sign in api
app.post('/api/SignIn', async (req,res) => 
{
    console.log('SignIn api hit');
    var error = '';

    // get incoming json
    const { email, password } = req.body;

    // do stuff with database
    const db = client.db();
    var query = 
    {
        email:email,
        password:password
    };

    var result = await db.collection('Users').findOne(query);

    if (result == null)
    {
        result = 
        {
            "_id": "-1",
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": ""
        };
    }
    // send result back
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);

});

app.put('/api/UpdateUser', async (req,res) => 
{
    console.log('UpdateUser api hit');
    var error = '';

    // get incoming json
    const { _id, firstName, lastName, email, password } = req.body;

    // do stuff with database
    const db = client.db();

    var query = 
    { 
        _id: ObjectId(_id)
    };

    var newValues = 
    {
        $set:
        {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password
        }
    };

    var result = await db.collection('Users').updateOne(query,newValues);

    // send result back
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);

});

app.delete('/api/DeleteUser', async (req,res) => 
{
    console.log('DeleteUser api hit');
    var error = '';

    // get incoming json
    const { _id } = req.body;

    // do stuff with database
    const db = client.db();

    var query = 
    { 
        _id: ObjectId(_id)
    };

    var result = await db.collection('Users').deleteOne(query);

    // send result back
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);

});

    // create email verification api

    // create reset password api

// --board api's--

    // create board api

app.post('/api/CreateBoard', async (req,res) => 
{
    console.log('CreateBoard api hit');
    var error = '';

    // get incoming json and format
    const { firstName, lastName, email, password } = req.body;
    const newUser =
    {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }

    // do stuff with database
    try
    {
        const db = client.db();
        const result = await db.collection('Users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    // send result back
    var ret = 
    {
        error: error
    };

    res.status(200).json(ret);

});

    // read board api

    // update board api

    // delete board api


// --list api's--

    // create list api

    // read list api

    // update list api

    // delete list api


// --card api's--

    // create card api

    // read card api

    // update card api

    // delete card api

// --Extra api's--

    // given a User return all boards belonging to that user

    // given a board return all Lists and Cards associated with that board

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));