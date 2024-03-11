const request = require("supertest");
const app = require('../src/app');
require('dotenv').config();

describe('Courses', () => {
    let server;
    beforeEach(() => {
        server = app.listen(process.env.PORT);
    });
    afterEach(() => {
        server.close();
    })

    let coursesAdded = [];
    
    describe('Creating Courses', () => { 
        test('Happy path', async () => {
            const response = await request(app)
            .post("/courses")
            .send(
            {
                "title": "test",
                "description": "test course", 
                "categories": "generic"
            })
            .expect(201)
            .expect((res) => {
                expect(res.body.message == "resource created");
                expect(res.body.data.title == "test")
            })

            coursesAdded.push(response.body.data.id);
        })

        test('Empty field', async () => {
            const response = await request(app)
            .post("/courses")
            .send(
            {
                "description": "test course", 
                "categories": "generic"
            })
            .expect(400)
            .expect((res) => res.body == "title is required");
        })

        test('Numeric input', async () => {
            const response = await request(app)
            .post("/courses")
            .send(
            {
                "title": 0,
                "description": "test course", 
                "categories": "generic"
            })
            .expect(400);
        })

        test('Empty input', async () => {
            const response = await request(app)
            .post("/courses")
            .send(
            {
                "title": "",
                "description": "", 
                "categories": ""
            })
            .expect(400);
        })
        test('Null input', async () => {
            const response = await request(app)
            .post("/courses")
            .send(
            {
                "title": null,
                "description": null, 
                "categories": null
            })
            .expect(400);
        })
        test('Undefined input', async () => {
            const response = await request(app)
            .post("/courses")
            .send(
            {
                "title": undefined,
                "description": undefined, 
                "categories": undefined
            })
            .expect(400);
        })
    })

    describe('Read Courses', () => { 
        test('Read All', async () => {
            const response = await request(app)
            .get("/courses")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                expect(res.body.message == "found");
                expect(res.body.data.length > 0);
            }) 
        })

        test('Read by id', async () => {
            const response = await request(app)
            .get(`/courses/${coursesAdded[0]}`)
            .expect("Content-Type", /json/)
            .expect(201); 
        })

        test('Read by id - Not a number', async () => {
            const response = await request(app)
            .get(`/courses/test}`)
            .expect("Content-Type", /json/)
            .expect(400); 
        })

        test('Read by Title', async () => {
            const response = await request(app)
            .get(`/courses/search?title=test`)
            .expect("Content-Type", /json/)
            .expect(201); 
        })
    })

    describe('Delete courses', () => {
        test('Empty field', async () => {
            const response = await request(app)
            .delete(`/courses/`)
            .expect(404);
        })

        test('Not a Number', async () => {
            const response = await request(app)
            .delete(`/courses/teste`)
            .expect(400);
        })
        test('Asterisk', async () => {
            const response = await request(app)
            .delete(`/courses/*`)
            .expect(400);
        })
        test('Null', async () => {
            const response = await request(app)
            .delete(`/courses/${null}`)
            .expect(400);
        })

        test('Delete all created tests', async () => {
            for(let i=0; i<coursesAdded.length;i++){
                const response = await request(app)
                .delete(`/courses/${coursesAdded[i]}`)
                .expect(204);
            }
        })

        test('Delete a non existent course', async () => {
            const response = await request(app)
            .delete(`/courses/${coursesAdded[0]}`)
            .expect(404);
        })
    })
})
    

