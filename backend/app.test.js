const request = require('supertest');
const mongoose = require('mongoose')
const app = require('./app');
const User = require("./models/User");

jest.setTimeout(10000);

beforeAll(async () => {
    const url = process.env.MONGODB_URI;
    await mongoose.connect(url, {useNewUrlParser: true})
})

describe('Test server running', () => {
    test('should return 200', (done) => {
        request(app)
            .get('/')
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe('Test User Route', () => {
    test('User creation', async () => {
        return await request(app)
            .post('/api/users/create')
            .send({
                name: 'test',
                email: 'test@gmail.com',
                password: 'test'
            })
            .then((response) => {
                expect(response.statusCode).toBe(201);

            });

    });

    test('Duplicate user in DB', async () => {
        return await request(app)
            .post('/api/users/create')
            .send({
                name: 'test',
                email: 'test@gmail.com',
                password: 'test'
            })
            .then((response) => {
                expect(response.statusCode).toBe(409);
            });
    });
});


describe('Test Auth Route', () => {

    test('User login SUCCESS', (done) => {
        request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@gmail.com',
                password: 'test'
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });

    });
    test('User login FAIL - not found', (done) => {
        request(app)
            .post('/api/auth/login')
            .send({
                email: 'test123@gmail.com',
                password: 'test'
            })
            .then((response) => {
                expect(response.statusCode).toBe(404);
                done();
            })
    });
    test('User login FAIL - wrong password', (done) => {
        request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@gmail.com',
                password: 'test123'
            })
            .then((response) => {
                expect(response.statusCode).toBe(401);
                done();
            });
    });
});

// Cleans up database between each test
afterAll(async () => {
    await User.deleteMany()
    await mongoose.connection.close()
})