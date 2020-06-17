const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// database stuff
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/DNTDB';
const client = new MongoClient(url, {useUnifiedTopology: true});
client.connect();

app.get('/', (req,res) => 
{
    console.log('Root hit');
    res.send('API root is working')
});

app.get('/api/test', (req,res) => 
{
    console.log('Test api hit');
    var test = 'THIS IS THE API TEST';

    // send result back
    var ret = {test: test};

    res.status(200).json(ret);

});

app.post('/api/SignUp', (req,res) => 
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
        password: password
    }

    // do stuff with database
    try
    {
      const db = client.db();
      const result = db.collection('Users').insertOne(newUser);
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
    const result = await db.collection('Users').find(query).toArray();

    console.log(result);

    // send result back
    var ret = 
    {
        result:result,
        error: error
    };

    res.status(200).json(ret);

});

app.listen(5000, () => console.log('Server started on port ${5000}'));