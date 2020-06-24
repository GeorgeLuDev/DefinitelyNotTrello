// nodejs stuff
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.port || 5000;

// mailing stuff
const nodemailer = require('nodemailer');
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
    const newUser =
    {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        emailVerification: 0
    }

    
    // do stuff with database
    try
    {
        const db = client.db();
        const result = await db.collection('Users').insertOne(newUser);
        var verifyUserEmail = {
            from: '"Definitely Not Trello" <definitelynottrello@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Verify Account', // Subject line
            text: 'Click the link below to verify your email', // plain text body
            // html: "<a href=\"localhost:3000/EmailVerification/" + result.ops[0]._id + "\">Verify Email</a>" // html body
            html: `<a href=\"http://localhost:3000/EmailVerification/${result.ops[0]._id}\">Verify Email</a>` // html body

        };

        transporter.sendMail(verifyUserEmail, (error, info) => {
            if (error) 
            {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      
        });
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

    var newValues = 
    {
        $set:
        {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            emailVerification : emailVerification
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
            html: "Reset Password Link" // html body
        };
    
        transporter.sendMail(verifyUserEmail, (error, info) => {
            if (error) 
            {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        });
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
    // receive reset password
    
    // var resetPasswordEmail = {
    //     from: '"Definitely Not Trello" <definitelynottrello@gmail.com>', // sender address
    //     to: 'RECEIVEREMAILS', // list of receivers
    //     subject: 'Reset Password', // Subject line
    //     text: 'Click the link below to reset your password', // plain text body
    //     html: "Hello World link2" // html body
    // };





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
    
    var newValues = 
    {
        $set:
        {
            listName : listName,
            index : index,
            parentBoard : parentBoard
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
    var sort = { index: 1 };

    // do stuff with database
    const db = client.db();

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
        console.log("i:" + i);
        listString.push(listResult[i].listName);
        query = 
        { 
            parentList: listResult[i]._id.toString()
        };
        
        console.log(query);
        var cardResult = await db.collection('Cards').find(query).sort(sort).toArray(); // fail not returning anything
        console.log(cardResult);
        for (var j = 0; j < cardResult.length;j++)
        {
            console.log("j:" + j);
            cardString[i].push(cardResult[j].cardName);
        }
    }

    // send result back
    var ret = 
    {
        listString: listString,
        cardString: cardString,
        error: error
    };

    res.status(200).json(ret);

});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
