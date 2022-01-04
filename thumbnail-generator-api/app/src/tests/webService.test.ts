/**
 * Integration test
 */

import supertest from 'supertest';
import ExpressWebService from '../adapters/expressWebService';
import thumbnailGeneratorRoutes from '../adapters/thumbnailRoutes';

const s3InstanceMock = {
    upload: jest.fn(() => (
        {
            promise: jest.fn(() => (
                {
                    Location: 'url'
                }
            ))
        }
    ))
}

jest.mock('resize-image-buffer')

jest.mock('aws-sdk', () => {
    return {
        config: { update: jest.fn() },
        S3: jest.fn().mockReturnValue(() => s3InstanceMock)
    };
});

jest.mock('express-fileupload', () => {
    return () => (request, response, next) => {
        request.files = { 
            image_to_be_resized: {
                name: 'test.png',
                mimetype: 'image/png',
                data: Buffer.from('test')
            }
        }
        next();
    }
})

describe('Test Express Web Service', () => {
    test('Should return resized images array', async () => {

        const webService = new ExpressWebService(thumbnailGeneratorRoutes);
        const app = webService.app;
        const response = await supertest(app).post("/thumbnail/resize-to-three-dimensions");
        expect(typeof response.body).toBe('object')
    })

    test("Should return 'started'", done => {
        const webService = new ExpressWebService(thumbnailGeneratorRoutes);
        const app = webService.app;
        const server = webService.start(3000);
        const handle = data => {
            server.close();
            expect(data.status).toBe('started')
            done()
        }
        app.on('started', handle)
    })
})