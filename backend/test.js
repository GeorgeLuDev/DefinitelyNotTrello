const express = require("express");
const app = express();
const request = require("supertest");
const {MongoClient} = require('mongodb');

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

describe("Test the root path", () => {
    test("Responds the GET method", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
});

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
        });
        db = await connection.db(global.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });

    // ALL TESTS ARE DEFINED, NOT PROPERLY LAID OUT

    // Set up each test for the database

    // --------- User Tests ---------
    it('Creates a new user', async () => {
        const users = db.collection('Users');

        const mockUser = {firstName: 'John', lastName: 'Doe', email:"test@test.com", password:"12345"};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({firstName: 'John', lastName: 'Doe', email:"test@test.com", password:"12345"});
        expect(insertedUser).toEqual(mockUser);
    });

    // Put this before each test, clears the db
    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    it('Deletes a user', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    // --------- Board Tests ---------
    it('Creates a board', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });
    
    it('Updates a board', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    it('Deletes a board', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    // --------- List Tests ---------
    it('Creates a list', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });
    
    it('Updates a list', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });
    

    it('Deletes a list', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    
    // --------- Card Tests ---------
    it('Creates a card', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });
    
    it('Updates a card', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    it('Deletes a card', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });
});

module.exports = app;