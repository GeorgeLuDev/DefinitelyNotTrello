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

describe('Unit Tests', () => {
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

        const insertedUser = await users.findOne(mockUser);
        expect(insertedUser).toEqual(mockUser);
    });

    // Put this before each test, clears the db
    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    it('Deletes a user', async () => {
        const users = db.collection('Users');

        const mockUser = {firstName: 'John', lastName: 'Doe', email:"test@test.com", password:"12345"};
        await users.insertOne(mockUser);
        await users.deleteOne(mockUser);

        const deletedUser = await users.findOne(mockUser);
        expect(deletedUser).toEqual(null);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    // --------- Board Tests ---------
    it('Creates a board', async () => {
        const boards = db.collection('Boards');

        const mockBoard = {boardName: 'New Board', index: '1', parentUsers: 'test@test.com'};
        await boards.insertOne(mockBoard);

        const insertedBoard = await boards.findOne(mockBoard);
        expect(insertedBoard).toEqual(mockBoard);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });
    
    it('Updates a board', async () => {
        const boards = db.collection('Boards');

        const mockBoard = {boardName: 'New Board', index: '1', parentUsers: 'test@test.com'};
        await boards.insertOne(mockBoard);

        const newMockBoard = {boardName: 'New Board', index: '2', parentUsers: 'test@test.com'};
        await boards.replaceOne(newMockBoard, mockBoard);

        const updatedMockBoard = await boards.findOne(mockBoard);
        expect(updatedMockBoard).toEqual(mockBoard);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    it('Deletes a board', async () => {
        const boards = db.collection('Boards');

        const mockBoard = {boardName: 'New Board', index: '1', parentUsers: 'test@test.com'};
        await boards.insertOne(mockBoard);
        await boards.deleteOne(mockBoard);

        const deletedBoard = await boards.findOne(mockBoard);
        expect(deletedBoard).toEqual(null);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    // --------- List Tests ---------
    it('Creates a list', async () => {
        const lists = db.collection('Lists');

        const mockList = {listName: 'New List', index: '1', parentBoard: 'Parent Board'};
        await lists.insertOne(mockList);

        const insertedList = await lists.findOne(mockList);
        expect(insertedList).toEqual(mockList);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });
    
    it('Updates a list', async () => {
        const lists = db.collection('Lists');

        const mockList = {listName: 'New List', index: '1', parentBoard: 'Parent Board'};
        await lists.insertOne(mockList);

        const newMockList = {listName: 'New List', index: '2', parentBoard: 'Parent Board'};;
        await lists.replaceOne(newMockList, mockList);

        const updatedMockList = await lists.findOne(mockList);
        expect(updatedMockList).toEqual(mockList);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });
    

    it('Deletes a list', async () => {
        const lists = db.collection('Lists');

        const mockList = {listName: 'New List', index: '1', parentBoard: 'Parent Board'};
        await lists.insertOne(mockList);
        await lists.deleteOne(mockList);

        const deletedList = await lists.findOne(mockList);
        expect(deletedList).toEqual(null);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    
    // --------- Card Tests ---------
    it('Creates a card', async () => {
        const cards = db.collection('Cards');

        const mockCard = {cardName: 'New Card', index: '1', parentList: 'Parent List'};
        await cards.insertOne(mockCard);

        const insertedCard = await cards.findOne(mockCard);
        expect(insertedCard).toEqual(mockCard);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });
    
    it('Updates a card', async () => {
        const cards = db.collection('Cards');

        const mockCard = {cardName: 'New List', index: '1', parentList: 'Parent List'};
        await cards.insertOne(mockCard);

        const newMockCard = {cardName: 'New List', index: '1', parentList: 'Parent List'};
        await cards.replaceOne(newMockCard, mockCard);

        const updatedMockCard = await cards.findOne(mockCard);
        expect(updatedMockCard).toEqual(mockCard);
    });

    beforeEach(async () => {
        await db.collection('COLLECTION_NAME').deleteMany({});
    });

    it('Deletes a card', async () => {
        const cards = db.collection('Cards');

        const mockCard = {cardName: 'New List', index: '1', parentList: 'Parent List'};
        await cards.insertOne(mockCard);
        await cards.deleteOne(mockCard);

        const deletedCard = await cards.findOne(mockCard);
        expect(deletedCard).toEqual(null);
    });
});

module.exports = app;