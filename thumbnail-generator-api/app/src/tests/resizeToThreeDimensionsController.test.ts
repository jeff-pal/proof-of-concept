/**
 * Declare/import here objects used inside jest mocks,
 * to prevent jest error: Cannot access 'object' before initialization
 */

import s3InstanceMock from '../mocks/s3InstanceMock';
import resizeToThreeDimensionsController from '../adapters/resizeToThreeDimensionsController';

const request = {
    files: { 
        image_to_be_resized: {
            name: 'test.png',
            mimetype: 'image/png',
            data: Buffer.from('test')
        }
    }
}

const response = { 
    statusCode: 200, 
    send: (data) => data
}



jest.mock('resize-image-buffer', () => {
    return () => Buffer.from('test')
})

jest.mock('aws-sdk', jest.fn(() => {
    return {
        config: { update: jest.fn() },
        S3: jest.fn().mockReturnValue(s3InstanceMock)
    };
}));

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

describe("Test 'Resize To Three Dimensions'", () => {
    test('', async () => {
        const sent = await resizeToThreeDimensionsController.handle(
            request,
            response
        )
        expect(typeof sent).toBe('object')
    })

})