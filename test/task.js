// const { should } = require('chai');
let chai = require("chai");
// let chai = require('chai').should();
let chaiHttp = require("chai-http");
// const { response } = require('express');
let server = require("../index");
// const should = require('should')


//Assertion Style
chai.should();
// should.exist(res.body);

chai.use(chaiHttp);


describe('Tasks API', () => {
    /**
     * Test the GET Route
     */ 
    describe('GET /api/tasks', () => {
        it('It should GET all the tasks', (done) => {
            chai.request(server)
            // console.log(chai.request())
                .get('/api/tasks')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(3);
                done();
                })
        })

        it('It should NOT GET all the tasks', (done) => {
            chai.request(server)
            // console.log(chai.request)
                .get('/api/task')
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                })
        })

    })

     /**
     * Test the GET (by id) Route
     */ 

    describe('GET /api/tasks/:id', () => {
        it('It should GET a tasks by ID', (done) => {
            const taskId = 1;
            chai.request(server)
            // console.log(chai.request())
                .get('/api/tasks/' + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('name');
                done();
                })
        })

        it('It should NOT GET any tasks by ID', (done) => {
            const taskId = 123;
            chai.request(server)
            // console.log(chai.request())
                .get('/api/tasks/' + taskId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The task with the provided ID does not exist.");
                done();
                })
        })


    })

     /**
     * Test the POST Route
     */ 

    describe('POST /api/tasks/', () => {
        it('It should POST a new task', (done) => {
            const task = {
                name: "task 4",
                completed: false
            };
            chai.request(server)
            // console.log(chai.request())
                .post('/api/tasks')
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(4);
                    response.body.should.have.property('name').eq('task 4');
                    response.body.should.have.property('completed').eq(false);
                done();
                })
        })

        it('It should NOT POST a new task without the name property', (done) => {
            const task = {
                name: "ta",
            };
            chai.request(server)
            // console.log(chai.request())
                .post('/api/tasks')
                .send(task)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                })
        })


    })


     /**
     * Test the PUT Route
     */ 

    describe('PUT /api/tasks/:ID', () => {
        it('It should PUT an existing task', (done) => {
            const taskId = 1 
            const task = {
                name: "task 1 changed",
                completed: true
            };
            chai.request(server)
            // console.log(chai.request())
                .put('/api/tasks/'+ taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('name').eq('task 1 changed');
                    response.body.should.have.property('completed').eq(true);
                done();
                })
        })

        it('It should NOT PUT an existing task with less than 3 characters', (done) => {
            const taskId = 1
            const task = {
                name: "ta",
                completed: false
            };
            chai.request(server)
            // console.log(chai.request())
                .put('/api/tasks/'+ taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                })
        })

    })

    


     /**
     * Test the PATCH Route
     */ 

    describe('PATCH /api/tasks/:ID', () => {
        it('It should PATCH an existing task', (done) => {
            const taskId = 1 
            const task = {
                name: "task 1 patch",
            };
            chai.request(server)
            // console.log(chai.request())
                .patch('/api/tasks/'+ taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('name').eq('task 1 patch');
                    response.body.should.have.property('completed').eq(true);
                done();
                })
        })

        it('It should NOT PATCH an existing task with a name less than 3 characters', (done) => {
            const taskId = 1 
            const task = {
                name: "ta",
            };
            chai.request(server)
            // console.log(chai.request())
                .patch('/api/tasks/'+ taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                })
        })

    })

     /**
     * Test the DELETE Route
     */ 

    describe('PATCH /api/tasks/:ID', () => {
        it('It should delete an existing task', (done) => {
            const taskId = 1 
            chai.request(server)
            // console.log(chai.request())
                .delete('/api/tasks/'+ taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                })
        });

        it('It should NOT delete a task that is not in the database', (done) => {
            const taskId = 123;
            chai.request(server)
            // console.log(chai.request())
                .delete('/api/tasks/'+ taskId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The task with the provided ID does not exist.");
                done();
                })
        });


    })




})
