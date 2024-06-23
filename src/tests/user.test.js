import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import connectDB from '../db/index.js';

let authToken = '';
let userId = '';

beforeAll(async () => {
    process.env.TEST = true;
    await connectDB();
    // Create a test user and generate a token
    const user = await User.create({ email: 'test@example.com', password: 'password123', name: 'Test User', age: 30, city: 'Test City', zipCode: "122345" });
    authToken = await user.generateAuthToken();
    user.token = authToken;
    await user.save();
    userId = user._id.toString();
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('User Routes', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/worko/user/register')
            .send({ email: 'newuser@example.com', name: 'New User', age: 25, password: 'password123', city: 'New City', zipCode: "678390" });

        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('user created successfully');
        expect(res.body.data.email).toBe('newuser@example.com');
    });

    it('should log in a user', async () => {
        const res = await request(app)
            .post('/worko/user/login')
            .send({ email: 'test@example.com', password: 'password123' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('login successful');
        expect(res.headers['set-cookie']).toBeDefined();
    });
    it('should get all users', async () => {
        const res = await request(app)
            .get('/worko/user')
            .set('Cookie', `token=${authToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('users fetched successfully');
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should get a specific user by ID', async () => {
        const res = await request(app)
            .get(`/worko/user/id/${userId}`)
            .set('Cookie', `token=${authToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('user fetched successfully');
        expect(res.body.data.id).toBe(userId);
    });

    it('should update a user by ID', async () => {
        const res = await request(app)
            .put(`/worko/user/id/${userId}`)
            .set('Cookie', `token=${authToken}`)
            .send({ name: 'Updated Name', age: 25, city: 'New City', zipCode: "678990" });


        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('user updated successfully');
        expect(res.body.data.name).toBe('updated name');
    });

    it('should partially update a user by ID', async () => {
        const res = await request(app)
            .patch(`/worko/user/id/${userId}`)
            .set('Cookie', `token=${authToken}`)
            .send({ city: 'Updated City' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('user updated successfully');
        expect(res.body.data.city).toBe('updated city');
    });
    it('should change password for the logged-in user', async () => {
        const res = await request(app)
            .patch('/worko/user/changepassword')
            .set('Cookie', `token=${authToken}`)
            .send({ newPassword: 'newpassword123' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('password updated successfully');
    });

    it('should delete a user by ID', async () => {
        const res = await request(app)
            .delete(`/worko/user/id/${userId}`)
            .set('Cookie', `token=${authToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('user deleted successfully');
    });
});
describe('Metrics Route', () => {
    beforeAll(async () => {
        process.env.TEST = true;
    })
    it('should return metrics', async () => {
        const res = await request(app)
            .get('/worko/metrics')

        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toContain('text/plain');
    });
});