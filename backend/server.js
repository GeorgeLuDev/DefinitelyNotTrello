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

// update users api
app.put('/api/UpdateUser', async (req,res) => 
{
    console.log('UpdateUser api hit');
    var error = '';

    // get incoming json
    const { _id, firstName, lastName, email, password, emailVerification, childrenBoards } = req.body;

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
            password : password,
            emailVerification : emailVerification,
            childrenBoards : childrenBoards
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

// delete user api
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

// --board api's--

// create board api

app.post('/api/CreateBoard', async (req,res) => 
{
    console.log('CreateBoard api hit');
    var error = '';

    // get incoming json and format
    const { boardName, index, parentUsers } = req.body;
    const newBoard =
    {
        boardName : boardName,
        index : index,
        parentUsers : parentUsers
    }

    // insert new board into DNTDB Boards collection
    try
    {
        const db = client.db();
        const result = await db.collection('Boards').insertOne(newBoard);
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
app.get('/api/ReadBoard/:id', async (req,res) => 
{
    console.log('ReadBoard api hit');
    var error = '';

    // 
    var query = 
    { 
        _id: ObjectId(req.params.id)
    };

    // do stuff with database
    const db = client.db();

    var result = await db.collection('Boards').findOne(query);

    // send result back
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);

});

// update board api
app.put('/api/UpdateBoard', async (req,res) => 
{
    console.log('UpdateBoard api hit');
    var error = '';

    // get incoming json
    const { _id, boardName, index, parentUsers } = req.body;

    // do stuff with database
    var query = 
    { 
        _id: ObjectId(_id)
    };
    
    var newValues = 
    {
        $set:
        {
            boardName : boardName,
            index : index,
            parentUsers , parentUsers
        }
    };
    
    const db = client.db();
    var result = await db.collection('Boards').updateOne(query,newValues);

    // send result back
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);

});

// delete board api
app.delete('/api/DeleteBoard', async (req,res) => 
{
    console.log('DeleteBoard api hit');
    var error = '';

    // get incoming json
    const { _id } = req.body;

    // do stuff with database
    
    var query = 
    { 
        _id: ObjectId(_id)
    };
    
    const db = client.db();
    var result = await db.collection('Boards').deleteOne(query);

    // send result back
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);

});

// --list api's--

// CreateList API
app.post('/api/CreateList', async (req,res) =>
{
    console.log('CreateList API hit.');
    var error = '';

    // Get JSON and format it.
    const { listName, index } = req.body;
    const newList =
    {
        listName : listName,
        index : index
    };

    // Insert new list into DNTDB Lists collection.
    try
    {
        const db = client.db();
        const result = await db.collection('Lists').insertOne(newList);
    }
    catch(e)
    {
        error = e.toString();
    }

    // Return result.
    var ret = 
    {
        error: error
    };

    res.status(200).json(ret);
});

// ReadList API
app.get('/api/ReadList/:id', async (req,res) => 
{
    console.log('ReadList API hit.');
    var error = '';

    // Get the ID to query the database.
    var query = 
    { 
        _id: ObjectId(req.params.id)
    };

    // Database search.
    const db = client.db();
    var result = await db.collection('Lists').findOne(query);

    // Return result.
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);

});

// UpdateList API
app.put('/api/UpdateList', async (req,res) => 
{
    console.log('UpdateList API hit.');
    var error = '';

    // Retrieve JSON.
    const { _id, listName, index } = req.body;

    // Get the ID to query the database.
    var query = 
    { 
        _id: ObjectId(_id)
    };
    
    var newValues = 
    {
        $set:
        {
            listName : listName,
            index : index,
        }
    };
    
    // Database search and update.
    const db = client.db();
    var result = await db.collection('Lists').updateOne(query, newValues);

    // Return result.
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);

});

// DeleteList API
app.delete('/api/DeleteList', async (req,res) => 
{
    console.log('DeleteList API hit');
    var error = '';

    // Retrieve JSON.
    const { _id } = req.body;


    // Get the ID to query the database.
    var query = 
    { 
        _id: ObjectId(_id)
    };
    
    // Database search and delete.
    const db = client.db();
    var result = await db.collection('Lists').deleteOne(query);

    // Return result.
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);

});


// --card api's--

// create card api
app.post('/api/CreateCard', async(req,res) =>
{
    console.log('CreateCard api hit');
    var error = '';
    const { cardName, index, parentList} = req.body;
    const newCard =
    {
        cardName : cardName,
        index : index,
        parentList : parentList
    };
    // insert into db
    try
    {
        const db = client.db();
        const result = await db.collection('Cards').insertOne(newCard);
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

// read card api
app.get('/api/ReadCard/:id', async(req,res) =>
{
    console.log('ReadCard api hit');
    var error = '';

    var query =
    {
        _id: ObjectId(req.params.id)
    };
    console.log(req.params.id);
    // read from db
    const db = client.db();
    var result = await db.collection('Cards').findOne(query);
    // send result back
    var ret = 
    {
        result : result,
        error: error
    };

    res.status(200).json(ret);
});

// update card api
app.put('/api/UpdateCard', async(req,res) =>
{
    console.log('UpdateCard api hit');
    var error = '';
    const { _id, cardName, index, parentList } = req.body;
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
            cardName : cardName,
            index : index,
            parentList : parentList
        }
    };

    var result = await db.collection('Cards').updateOne(query,newValues);

    // send result back
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);
});

// delete card api
app.delete('/api/DeleteCard', async(req,res) =>
{
    console.log('UpdateCard api hit');
    var error = '';
    const { _id } = req.body;
    // do stuff with database
    const db = client.db();

    var query = 
    { 
        _id: ObjectId(_id)
    };

    var result = await db.collection('Cards').deleteOne(query);

    // send result back
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);
});

// --Extra api's--

    // given a User return all boards belonging to that user

    // given a board return all Lists and Cards associated with that board

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));