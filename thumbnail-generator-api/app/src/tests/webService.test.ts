/**
 * Integration test
 */

import ExpressWebService from '../adapters/expressWebService';
import supertest from 'supertest';
import thumbnailGeneratorRoutes from '../adapters/thumbnailGeneratorRoutes';

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

jest.mock('../adapters/awsS3', () => {
  return jest.fn(() => ({
      upload: () => 'link'
  }))  
});

jest.mock('resize-image-buffer')

describe('Test Express Web Service', () => {
    test('Should return resized images array', async () => {

        const webService = new ExpressWebService(thumbnailGeneratorRoutes);
        const app = webService.app;
        const response = await supertest(app).post("/thumbnail-generator/resize-image");
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