import request from 'supertest';
import app from '../index';

const agent = request.agent(app);
let token = '';
let createdPostID = '';
const posts = [
    {
        _id: '64f807ac0c646ac0e64a5945',
        title: 'King and comissioner',
        content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
        author: {
            _id: '64f807930c646ac0e64a5942',
            name: 'Selbin C R',
            email: 'selbinchirayath@gmail.com',
            createdAt: '2023-09-06T05:01:07.891Z',
            updatedAt: '2023-09-06T05:01:07.891Z',
            __v: 0
        },
        createdAt: '2023-09-06T05:01:32.105Z',
        updatedAt: '2023-09-06T05:01:32.105Z',
        __v: 0
    }
];

describe('Posts API', () => {
    describe('GET /api/posts', () => {
        test('should retrieve all posts successfully', async () => {
            const res = await agent.get('/api/posts');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(posts);
        });
    });

    describe('GET /api/posts/:id', () => {
        test('should retrieve a post by ID successfully', async () => {
            const res = await agent.get(`/api/posts/${posts[0]._id}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(posts[0]);
        });
    });

    describe('User Authentication and Post CRUD Operations', () => {
        beforeAll(async () => {
            // Log in and obtain a token
            const loginResponse = await agent.post('/author/login').send({
                email: 'selbinchirayath@gmail.com',
                password: 'Qwerty@1222'
            });
            expect(loginResponse.statusCode).toEqual(200);
            token = loginResponse.body.token;
        });

        describe('POST /api/posts', () => {
            test('should create a new post successfully', async () => {
                const newPost = {
                    title: 'King',
                    content: 'Lorem Ipsum is simply dummy text of the printing'
                };
                const createResponse = await agent.post('/api/posts').set('Authorization', `Bearer ${token}`).send(newPost);

                expect(createResponse.statusCode).toEqual(201);
                createdPostID = createResponse.body._id;
                expect(createResponse.body).toMatchObject(newPost);
            });
        });

        describe('PUT /api/posts/:id', () => {
            test('should update a post by ID successfully', async () => {
                const updatedPost = { title: 'edited' };
                const updateResponse = await agent.put(`/api/posts/${createdPostID}`).set('Authorization', `Bearer ${token}`).send(updatedPost);

                expect(updateResponse.statusCode).toEqual(200);
                expect(updateResponse.body).toMatchObject({
                    ...updateResponse.body,
                    title: 'edited'
                });
            });
        });

        describe('DELETE /api/posts/:id', () => {
            test('should delete a post by ID successfully', async () => {
                const deleteResponse = await agent.delete(`/api/posts/${createdPostID}`).set('Authorization', `Bearer ${token}`);

                expect(deleteResponse.statusCode).toEqual(200);
                expect(deleteResponse.body).toEqual({ message: 'Blog post deleted' });
            });
        });
    });
});
