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
    let userToken;
    let courseId;

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
            userToken = response.body.token;
        })
    
        test('Create Course', async () => {
            const response = await request(app)
                .post("/courses")
                .send(
                {
                    "title": "test title",
                    "description": "test course", 
                    "categories": "generic"
                })
                .expect(201)
    
                courseId = response.body.data.id;
        })
    })
    
    describe('Testing', () => {
        test('Enroll User', async () => {
            console.debug(typeof userId);
            console.debug(typeof courseId);

            const userToSend = userId.toString();
            const userTokenSend = userToken.toString();
            const courseToSend = courseId.toString();
            const response = await request(app)
            .post("/user/enroll")
            .set('authorization', userTokenSend)
            .send(
                {
                    "userid": userToSend,
                    "courseid": courseToSend,
                }
            )
            .expect(201);
        })
        
        
        test('Enroll in a non existent course', async () => {
            const userToSend = userId.toString();
            const userTokenSend = userToken.toString();
            const response = await request(app)
            .post("/user/enroll")
            .set('authorization', userTokenSend)
            .send(
                {
                    "userid": userToSend,
                    "courseid": '123456'
                }
            )
            .expect(500);
        })
    })

    
    describe('Clearing', () => {
        test('Delete created user', async () => {
            const userToSend = userId.toString();
            const userTokenSend = userToken.toString();
            const response = await request(app)
            .delete(`/user/${userToSend}`)
            .set('authorization', userTokenSend)
            .expect(204);
        }) 
    
        test('Delete created course', async () => {
            const courseToSend = courseId.toString();
            const response = await request(app)
            .delete(`/courses/${courseToSend}`)
            .expect(204);
        }) 
    })
    

    
    
    

    
})