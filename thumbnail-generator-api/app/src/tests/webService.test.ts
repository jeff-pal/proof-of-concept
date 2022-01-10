/**
 * Declare/import here objects used inside jest mocks,
 * to prevent jest error: Cannot access 'object' before initialization
 */
import s3InstanceMock    from '../mocks/s3InstanceMock';
import supertest         from 'supertest';
import ExpressWebService from '../adapters/expressWebService';
import router            from '../adapters/router';

jest.mock('aws-lambda-resize-img')

jest.mock('aws-sdk', () => {
    return {
        config: { update: jest.fn() },
        S3: jest.fn().mockReturnValue(s3InstanceMock)
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
    test('Should return ...', async () => {
        const webService = new ExpressWebService(router);
        const app = webService.app;
        const response = await supertest(app).get("/");
        expect(response.text).toBe('Thumbnail app is running...')
    })


    test('Should return resized images array', async () => {

        const webService = new ExpressWebService(router);
        const app = webService.app;
        const response = await supertest(app).post("/thumbnail/resize-to-three-dimensions");
        expect(typeof response.body).toBe('object')
    })

    test("Should return 'started'", done => {
        const webService = new ExpressWebService(router);
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