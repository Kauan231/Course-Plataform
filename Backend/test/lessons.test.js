const request = require("supertest");
const app = require('../src/app');
require('dotenv').config();

describe('Lessons', () => {
    let server;
    beforeEach(() => {
        server = app.listen(process.env.PORT);
    });
    afterEach(() => {
        server.close();
    })

    let courseId;

    describe('Creating Variables', () => {    
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
        test('Create lesson', async () => {
            const courseToSend = courseId.toString();
            const response = await request(app)
            .post("/courses/lessons")
            .send(
                {
                    "title": "Generic lesson",
                    "courseid": courseToSend,
                    "video": "https://youtu.be/PkZNo7MFNFg",
                    'description': "Generic description"
                }
            )
            .expect(201);
        })
        
        
        test('Create a null lesson', async () => {
            const response = await request(app)
            .post("/courses/lessons")
            .send(
                {
                    "title": null,
                    "courseid": "123456",
                    "video": null,
                    'description': null
                }
            )
            .expect(400);
        })
        test('Create a undefined lesson', async () => {
            const response = await request(app)
            .post("/courses/lessons")
            .send(
                {
                    "title": undefined,
                    "courseid": "123456",
                    "video": undefined,
                    'description': undefined
                }
            )
            .expect(400);
        })
        test('Create lesson in a non existent course', async () => {
            const response = await request(app)
            .post("/courses/lessons")
            .send(
                {
                    "title": "Generic lesson",
                    "courseid": "123456",
                    "video": "https://youtu.be/PkZNo7MFNFg",
                    'description': "Generic description"
                }
            )
            .expect(500);
        })
        test('Create lesson in a null course', async () => {
            const response = await request(app)
            .post("/courses/lessons")
            .send(
                {
                    "title": "Generic lesson",
                    "courseid":null,
                    "video": "https://youtu.be/PkZNo7MFNFg",
                    'description': "Generic description"
                }
            )
            .expect(400);
        })
        test('Create lesson in a undefined course', async () => {
            const response = await request(app)
            .post("/courses/lessons")
            .send(
                {
                    "title": "Generic lesson",
                    "courseid":undefined,
                    "video": "https://youtu.be/PkZNo7MFNFg",
                    'description': "Generic description"
                }
            )
            .expect(400);
        })

        test('Read Course lessons', async () => {
            const courseToSend = courseId.toString();
            const response = await request(app)
            .get(`/courses/${courseToSend}/lessons`)
            .expect(200)
            .expect((res) => {
                expect(res.body.coursename == "test title");
                expect(res.body.data.title == "Generic lesson");
            })
        })
    })

    
    describe('Clearing', () => {
        test('Delete created course', async () => {
            const courseToSend = courseId.toString();
            const response = await request(app)
            .delete(`/courses/${courseToSend}`)
            .expect(204);
        }) 

        test('Read deleted course lessons', async () => {
            const courseToSend = courseId.toString();
            const response = await request(app)
            .get(`/courses/${courseToSend}/lessons`)
            .expect(404)
        })
    })
    

    
    
    

    
})