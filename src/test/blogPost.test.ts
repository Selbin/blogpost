import request from 'supertest';

import { appInstance } from '../index';

describe('GET /api/posts', () => {
    it('should return an array of blog posts ', async () => {
        const response = await request(appInstance()).get('/api/posts');
        expect(response.status).toBe(200);
    });
});
