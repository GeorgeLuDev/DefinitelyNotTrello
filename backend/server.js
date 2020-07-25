// nodejs stuff
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.port || 5000;
require('dotenv').config();
const passwordHash = require('password-hash');

// mailing stuff
const nodemailer = require('nodemailer');
const { connect } = require('mongodb');
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'definitelynottrello@gmail.com', // generated ethereal user
        pass: 'COP4331_11'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
});

// database stuff
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/DNTDB';
const client = new MongoClient(url, {useUnifiedTopology: true});
client.connect();
console.log("server.js connected! Email url is " + process.env.EMAIL_URL);

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE'
  );
  next();
});

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

    var hashedPassword = passwordHash.generate(password);

    const newUser =
    {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        emailVerification: 0
    }

    const db = client.db();

    const alreadyin = await db.collection("Users").find({email: email}).toArray();

    // console.log(alreadyin.length);

    if (alreadyin.length === 0)
    {
        // console.log("user is not in");
        // user is not in database
        // create user
        try
        {
            const result = await db.collection('Users').insertOne(newUser);
            var verifyUserEmail = {
                from: '"Definitely Not Trello" <definitelynottrello@gmail.com>', // sender address
                to: email, // list of receivers
                subject: 'Verify Account', // Subject line
                text: 'Click the link below to verify your email', // plain text body
                // html: "<a href=\"localhost:3000/EmailVerification/" + result.ops[0]._id + "\">Verify Email</a>" // html body
                html: `<a href=\"${process.env.EMAIL_URL}EmailVerification/${result.ops[0]._id}\">Verify Email</a>` // html body
    
            };
    
            transporter.sendMail(verifyUserEmail, (error, info) => {
                if (error) 
                {
                    return console.log(error);
                }
                // console.log('Message sent: %s', info.messageId);   
                // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          
            });
        }
        catch(e)
        {
          error = e.toString();
        }
    }
    else
    {
        // user is already in database
        // dont create user
        // send them to sign in
        error = "An account is already associated with this email";
    }
    // do stuff with database

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

    var hashedPassword = passwordHash.generate(password);

    // do stuff with database
    const db = client.db();
    var query = 
    {
        email:email,
        password:hashedPassword
    };

    var result = await db.collection('Users').findOne(query);

    if (result == null)
    {
        result = 
        {
            "_id": "-1",
            "firstName": "",
            "lastName": "",
            "emailVerification": "",
        };
    }
    // send result back
    var ret = 
    {
        id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        emailVerification: result.emailVerification,
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
    const { _id, firstName, lastName, email, password, emailVerification } = req.body;

    // do stuff with database
    const db = client.db();

    var query = 
    { 
        _id: ObjectId(_id)
    };

    var objForUpdate = {};

    if (req.body.firstName) objForUpdate.firstName = req.body.firstName;
    if (req.body.lastName) objForUpdate.lastName = req.body.lastName;
    if (req.body.email) objForUpdate.email = req.body.email;
    if (req.body.password) objForUpdate.password = req.body.password;
    if (req.body.emailVerification) objForUpdate.emailVerification = req.body.emailVerification;

    var newValues = 
    {
        $set : objForUpdate
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

// --user email stuff--

    // email verification
app.put('/api/EmailVerification', async (req,res) => 
{
    console.log('EmailVerification api hit');
    var error = '';

    // get incoming json
    const { _id } = req.body;

    // do stuff with database
    const db = client.db();
    console.log(_id);
    
    var query = 
    { 
        _id: ObjectId(_id)
    };

    var newValues = 
    {
        $set:
        {
            emailVerification : 1
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

    // send reset password
app.post('/api/SentResetPassword', async (req,res) => 
{
    console.log('SentResetPassword api hit');
    var error = '';

    
    // get incoming json and format
    const {email} = req.body;
    const newUser =
    {
        email: email
    }

    // check email is in database then send email if it is

    const db = client.db();
    var query = 
    {
        email:email
    };

    var result = await db.collection('Users').findOne(query);
    
    if (result != null)
    {
        var verifyUserEmail = {
            from: '"Definitely Not Trello" <definitelynottrello@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Reset Password', // Subject line
            text: 'Click the link below to reset password', // plain text body
            html: `<a href=\"${process.env.EMAIL_URL}UpdatePassword/${result._id}\">Reset Password Link</a>` // html body
        };
    
        transporter.sendMail(verifyUserEmail, (error, info) => {
            if (error) 
            {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        });
        
        error = "We are sending a password reset email.";
    }
    else
    {
        error = "Couldn't find a user with that email address";
    }



    // send result back
    var ret = 
    {
        error: error
    };

    res.status(200).json(ret);

});
    // update reset password

app.put('/api/UpdatePassword', async (req, res) =>
{
    console.log("UpdatePassword api hit");
    var error = '';

    console.log(req.body);

    const { _id,  password} = req.body;

    const db = client.db();

    var hashedPassword = passwordHash.generate(password);

    var query = 
    { 
        _id: ObjectId(_id)
    };

    var newValues = 
    {
        $set:
        {
            password : hashedPassword
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

// --board api's--

// create board api

app.post('/api/CreateBoard', async (req,res) => 
{
    console.log('CreateBoard api hit');
    var error = '';

    var bgs = [
      "https://images.unsplash.com/photo-1595323397978-65433d24fc23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=80",
      "https://images.unsplash.com/photo-1590440048050-764e709d3380?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
      "https://images.unsplash.com/photo-1556031970-26f08a4b18ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80",
      "https://images.unsplash.com/photo-1546767426-7e015e14c229?ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80",
      "https://images.unsplash.com/photo-1509652839609-d94a8ad572db?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
      "https://images.unsplash.com/photo-1555679486-e341a3e7b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
      "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1425x1920/27bae813ecc676ae43446de94f23b218/photo-1595355833291-279b3a7a47ac.jpg",
      "https://images.unsplash.com/photo-1552372910-bd19f8ec2c9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
    ];

    // get incoming json and format
    const { boardName, index, parentUsers } = req.body;
    const newBoard =
    {
        boardName : boardName,
        index : index,
        boardBackground : bgs[Math.floor(Math.random(0) * bgs.length)],
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
    const { _id, boardName, index, boardBackground, parentUsers } = req.body;

    // do stuff with database
    var query = 
    { 
        _id: ObjectId(_id)
    };
    
    var objForUpdate = {};

    if (req.body.boardName) objForUpdate.boardName = req.body.boardName;
    if (req.body.index) objForUpdate.index = req.body.index;
    if (req.body.boardBackground) objForUpdate.boardBackground = req.body.boardBackground;
    if (req.body.parentUsers) objForUpdate.parentUsers = req.body.parentUsers;

    var newValues = 
    {
        $set : objForUpdate
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

// MoveBoard API
app.put('/api/MoveBoard', async (req,res) => 
{
    console.log('MoveBoard API hit.');
    var error = '';

    // Retrieve JSON.
    const { _id, oldIndex, newIndex, parentUsers } = req.body;

    // Get the ID to query the database.
    var query1;

    var query2 = 
    { 
        _id: ObjectId(_id)
    };

    var newValues;
    const db = client.db();

    if (oldIndex == newIndex)
    {
        // do nothing
    }
    else if (oldIndex > newIndex)
    {
        // shift things down
        query1 = { 
            parentUsers: parentUsers,
            index: {$in: [...Array(parseInt(oldIndex - parseInt(newIndex) + 1))].map((_, index) => index + parseInt(newIndex))}
        };

        newValues = 
        {
            $inc:
            {
                index: 1
            }
        }

        var result = await db.collection('Boards').updateMany(query1, newValues);
        // var result = await db.collection('Lists').find(query1).toArray();
        // console.log(result);
        newValues = 
        {
            $set:
            {
                index: parseInt(newIndex)
            }
        }
        var result = await db.collection('Boards').updateOne(query2, newValues);
        // console.log(result);
    }
    else if (oldIndex < newIndex)
    {
        // shift things up
        query1 = { 
            parentUsers: parentUsers,
            index: {$in: [...Array(parseInt(newIndex - parseInt(oldIndex) + 1))].map((_, index) => index + parseInt(oldIndex))}
        };

        newValues = 
        {
            $inc:
            {
                index: -1
            }
        }

        var result = await db.collection('Boards').updateMany(query1, newValues);
        // var result = await db.collection('Lists').find(query1).toArray();
        // console.log(result);
        newValues = 
        {
            $set:
            {
                index: parseInt(newIndex)
            }
        }
        var result = await db.collection('Boards').updateOne(query2, newValues);
        // console.log(result);
    }

    var ret = 
    {
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
    const db = client.db();
    // do stuff with database
    
    var query1 = 
    { 
        _id: ObjectId(_id)
    };
    
    var result = await db.collection('Boards').findOne(query1);

    var query2 = 
    { 
        parentUsers: result.parentUsers[0],
        index: {$gte: parseInt(result.index)}
    };

    newValues = 
    {
        $inc:
        {
            index: -1
        }
    }

    var query3 = 
    { 
        parentBoard: _id
    };
    var result = await db.collection('Boards').updateMany(query2, newValues);

    var result = await db.collection('Lists').find(query3).toArray();

    for (i=0;i<result.length;i++)
    {
        var query4 =
        {
            parentList: result[i]._id.toString()
        }
        console.log(result[i]._id);
        var result1 = await db.collection('Cards').deleteMany(query4);
    }

    var result = await db.collection('Lists').deleteMany(query3);

    var result = await db.collection('Boards').deleteOne(query1);

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
    const { listName, index , parentBoard } = req.body;
    const newList =
    {
        listName : listName,
        index : index,
        parentBoard : parentBoard
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
    const { _id, listName, index, parentBoard } = req.body;

    // Get the ID to query the database.
    var query = 
    { 
        _id: ObjectId(_id)
    };

    var objForUpdate = {};

    if (req.body.listName) objForUpdate.listName = req.body.listName;
    if (req.body.index) objForUpdate.index = req.body.index;
    if (req.body.parentBoard) objForUpdate.parentBoard = req.body.parentBoard;
    
    var newValues = 
    {
        $set : objForUpdate
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

// MoveList API
app.put('/api/MoveList', async (req,res) => 
{
    console.log('MoveList API hit.');
    var error = '';

    // Retrieve JSON.
    const { _id, oldIndex, newIndex, parentBoard } = req.body;

    // Get the ID to query the database.
    var query1;

    var query2 = 
    { 
        _id: ObjectId(_id)
    };

    var newValues;
    const db = client.db();
    // console.log(_id);
    // console.log(oldIndex);
    // console.log(newIndex);
    // console.log(parentBoard);

    if (oldIndex == newIndex)
    {
        // do nothing
    }
    else if (oldIndex > newIndex)
    {
        // shift things down
        query1 = { 
            parentBoard: parentBoard,
            index: {$in: [...Array(parseInt(oldIndex - parseInt(newIndex) + 1))].map((_, index) => index + parseInt(newIndex))}
        };

        newValues = 
        {
            $inc:
            {
                index: 1
            }
        }

        var result = await db.collection('Lists').updateMany(query1, newValues);
        // var result = await db.collection('Lists').find(query1).toArray();
        // console.log(result);
        newValues = 
        {
            $set:
            {
                index: parseInt(newIndex)
            }
        }
        var result = await db.collection('Lists').updateOne(query2, newValues);
        // console.log(result);
    }
    else if (oldIndex < newIndex)
    {
        // shift things up
        query1 = { 
            parentBoard: parentBoard,
            index: {$in: [...Array(parseInt(newIndex - parseInt(oldIndex) + 1))].map((_, index) => index + parseInt(oldIndex))}
        };

        newValues = 
        {
            $inc:
            {
                index: -1
            }
        }

        var result = await db.collection('Lists').updateMany(query1, newValues);
        // var result = await db.collection('Lists').find(query1).toArray();
        // console.log(result);
        newValues = 
        {
            $set:
            {
                index: parseInt(newIndex)
            }
        }
        var result = await db.collection('Lists').updateOne(query2, newValues);
        // console.log(result);
    }

    var ret = 
    {
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

    const db = client.db();

    // Get the ID to query the database.
    var query1 = 
    { 
        _id: ObjectId(_id)
    };

    var result = await db.collection('Lists').findOne(query1);

    var query2 = 
    { 
        parentBoard: result.parentBoard,
        index: {$gte: parseInt(result.index)}
    };

    newValues = 
    {
        $inc:
        {
            index: -1
        }
    }

    var query3 = 
    { 
        parentList: _id
    };
    var result = await db.collection('Lists').updateMany(query2, newValues);
    var result = await db.collection('Cards').deleteMany(query3);
    var result = await db.collection('Lists').deleteOne(query1);

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

    var objForUpdate = {};

    if (req.body.cardName) objForUpdate.cardName = req.body.cardName;
    if (req.body.index) objForUpdate.index = req.body.index;
    if (req.body.parentList) objForUpdate.parentList = req.body.parentList;
    
    var newValues = 
    {
        $set : objForUpdate
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

// Move card api
app.put('/api/MoveCard', async (req,res) => 
{
    console.log('MoveCard API hit.');
    var error = '';

    // Retrieve JSON.
    const { _id, oldIndex, newIndex, oldparentList, newparentList } = req.body;

    // Get the ID to query the database.
    var query1;

    var query2 = 
    { 
        _id: ObjectId(_id)
    };

    var newValues;
    const db = client.db();

    if (oldparentList == newparentList)
    {
        if (oldIndex == newIndex)
        {
            // do nothing
        }
        else if (oldIndex > newIndex)
        {
            // shift things down
            query1 = { 
                parentList: oldparentList,
                index: {$in: [...Array(parseInt(oldIndex - parseInt(newIndex) + 1))].map((_, index) => index + parseInt(newIndex))}
            };
    
            newValues = 
            {
                $inc:
                {
                    index: 1
                }
            }
    
            var result = await db.collection('Cards').updateMany(query1, newValues);
            // var result = await db.collection('Lists').find(query1).toArray();
            // console.log(result);
            newValues = 
            {
                $set:
                {
                    index: parseInt(newIndex)
                }
            }
            var result = await db.collection('Cards').updateOne(query2, newValues);
            // console.log(result);
        }
        else if (oldIndex < newIndex)
        {
            // shift things up
            query1 = { 
                parentList: oldparentList,
                index: {$in: [...Array(parseInt(newIndex - parseInt(oldIndex) + 1))].map((_, index) => index + parseInt(oldIndex))}
            };
    
            newValues = 
            {
                $inc:
                {
                    index: -1
                }
            }
    
            var result = await db.collection('Cards').updateMany(query1, newValues);
            // var result = await db.collection('Lists').find(query1).toArray();
            // console.log(result);
            newValues = 
            {
                $set:
                {
                    index: parseInt(newIndex)
                }
            }
            var result = await db.collection('Cards').updateOne(query2, newValues);
            // console.log(result);
        }
    }
    else
    {
        console.log("moving card to different list");
        // card moving to a different list
        query1 = { 
            parentList: oldparentList,
            index: {$gt: parseInt(oldIndex)}
        };

        newValues = 
        {
            $inc:
            {
                index: -1
            }
        }

        var result = await db.collection('Cards').updateMany(query1, newValues);
        // var result = await db.collection('Cards').find(query1).toArray();
        // console.log(result);

        query1 = { 
            parentList: newparentList,
            index: {$gte: parseInt(newIndex)}
        };

        newValues = 
        {
            $inc:
            {
                index: 1
            }
        }

        var result = await db.collection('Cards').updateMany(query1, newValues);
        newValues = 
        {
            $set:
            {
                index: parseInt(newIndex),
                parentList: newparentList
            }
        }
        var result = await db.collection('Cards').updateOne(query2, newValues);
        // console.log(result);
    }

    var ret = 
    {
        error: error
    };

    res.status(200).json(ret);

});

// delete card api
app.delete('/api/DeleteCard', async(req,res) =>
{
    console.log('DeleteCard api hit');
    var error = '';
    const { _id } = req.body;
    // do stuff with database
    const db = client.db();

    var query1 = 
    { 
        _id: ObjectId(_id)
    };

    var result = await db.collection('Cards').findOne(query1);

    var query2 = 
    { 
        parentList: result.parentList,
        index: {$gte: parseInt(result.index)}
    };

    newValues = 
    {
        $inc:
        {
            index: -1
        }
    }
    var result = await db.collection('Cards').updateMany(query2, newValues);

    var result = await db.collection('Cards').deleteOne(query1);

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
app.get('/api/User/:id', async (req,res) => 
{
    console.log('User/id api hit');
    var error = '';

    // Get the User ID to query the database.
    var query = 
    { 
        parentUsers: req.params.id
    };
    var sort = { index: 1 };

    // Database search.
    const db = client.db();
    var result = await db.collection('Boards').find(query).sort(sort).toArray();


    // Return result.
    var ret = 
    {
        result: result,
        error: error
    };

    res.status(200).json(ret);

});


// given a board return all Lists and Cards associated with that board
app.get('/api/Board/:id', async (req,res) => 
{
    console.log('Board/:id api hit');
    var error = '';

    // 
    var query = 
    { 
        parentBoard: req.params.id
    };
    var query1 = 
    { 
        _id: ObjectId(req.params.id)
    };
    var sort = { index: 1 };

    // do stuff with database
    const db = client.db();

    var boardResult = await db.collection('Boards').findOne(query1);

    // given a board return all Lists and Cards associated with that board
if (process.env.NODE_ENV === 'production')
{
	app.use(express.static('frontend/build'));
}
    var listResult = await db.collection('Lists').find(query).sort(sort).toArray();
    var listString = [];
    var cardString = [[],[]];
    // console.log(listResul[];
    // console.log(listResult.length);

    for (var i=0;i<listResult.length;i++)
    {
        listString.push(listResult[i].listName);
        query = 
        { 
            parentList: listResult[i]._id.toString()
        };
        
        var cardResult = await db.collection('Cards').find(query).sort(sort).toArray(); // fail not returning anything
        cardString[i] = cardResult;

        // for (var j = 0; j < cardResult.length;j++)
        // {
        //     console.log("j:" + j);
        //     cardString[i].push(cardResult[j].cardName);
        // }
    }

    // send result back
    var ret = 
    {
        boardString: boardResult.boardName,
        boardBackground: boardResult.boardBackground,
        listString: listResult,
        cardString: cardString,
        error: error
    };

    res.status(200).json(ret);

});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
