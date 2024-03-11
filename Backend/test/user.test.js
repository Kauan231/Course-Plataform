const request = require("supertest");
const app = require('../src/app');
require('dotenv').config();

describe('Enroll', () => {
    let server;
    beforeEach(() => {
        server = app.listen(process.env.PORT);
    });
    afterEach(() => {
        server.close();
    })

    let userId;

    describe('Creating Variables', () => {
        test('Create User', async () => {
            const response = await request(app)
            .post("/register")
            .send(
            {
                "email": "test@outlook.com",
                "username": "test", 
                "firstname": "generic",
                "lastname": "user",
                "password": "1234"
            })
            .expect(201)
    
            userId = response.body.data.id;
        })
    })
    
    describe('Testing', () => {
        test('Login user with email', async () => {
            const response = await request(app)
            .post("/login")
            .send(
                {
                    "email": "test@outlook.com",
                    "password": "1234",
                }
            )
            .expect(200);
        })
        test('Login user with username', async () => {
            const response = await request(app)
            .post("/login")
            .send(
                {
                    "username": "test",
                    "password": "1234",
                }
            )
            .expect(200);
        })

        test('Wrong Password', async () => {
            const response = await request(app)
            .post("/login")
            .send(
                {
                    "username": "test",
                    "password": "wrong123",
                }
            )
            .expect(400)
            .expect((res) => {
                expect(res.body.message == 'incorrect password');
            });
        })

        test('Login user with null username', async () => {
            const response = await request(app)
            .post("/login")
            .send(
                {
                    "username": null,
                    "password": "1234",
                }
            )
            .expect(400);
        })
        test('Login user with undefined username', async () => {
            const response = await request(app)
            .post("/login")
            .send(
                {
                    "username": undefined,
                    "password": "1234",
                }
            )
            .expect(400);
        })
        test('Login user with null password', async () => {
            const response = await request(app)
            .post("/login")
            .send(
                {
                    "username": "test",
                    "password": null,
                }
            )
            .expect(400);
        })
        test('Login user with undefined username', async () => {
            const response = await request(app)
            .post("/login")
            .send(
                {
                    "username": "test",
                    "password": undefined,
                }
            )
            .expect(400);
        })
    })

    
    describe('Clearing', () => {
        test('Delete created user', async () => {
            const userToSend = userId.toString();
            const response = await request(app)
            .delete(`/user/${userToSend}`)
            .expect(204);
        }) 
    })
    

    
    
    

    
})