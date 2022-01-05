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
    statusMessage: '',
    send: (data: []) => data,
    status: () => ({ send: (data: {}) => data})
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

describe("Test resizeToThreeDimensionsController - handle", () => {
    test('Should return an array of image links', async () => {
        const sent = await resizeToThreeDimensionsController.handle(
            request,
            response
        );
        expect(typeof sent).toBe('object');
    });

    test("'Should return error: 'No files found'", async () => {
        const sent = await resizeToThreeDimensionsController.handle(
            {...request, files: null},
            response
        );
        expect(sent).toEqual(new Error('No files found'));
    });

    test("'Should return error: 'File type invalid'", async () => {
        const files = { ...request.files }
        files.image_to_be_resized.mimetype = 'invalid';

        const sent = await resizeToThreeDimensionsController.handle(
            {...response, files},
            response
        );
        expect(sent).toEqual(new Error('File type invalid'));
    });

    test("'Should return some error on a Throw", async () => {
        // @ts-ignore - with this command we ignore type checking for the line bellow.
        const sent = await resizeToThreeDimensionsController.handle();
        expect(sent).toBeInstanceOf(Error);
    });


})

describe('Test resizeToThreeDimensionsController - getFileExtension', () => {
    test("Should return string", () => {
        const extension = resizeToThreeDimensionsController.getFileExtension('image/png');
        expect(typeof extension).toBe('string');
    });

    test("Should return error: 'Invalid mimetype format. It should be a string.'", () => {
        const extension = resizeToThreeDimensionsController.getFileExtension(null);
        expect(extension)
        .toEqual(new Error('Invalid mimetype input. It should be a string.'));
    });

    test("Should return error: 'Invalid mimetype format. It should be a string.'", () => {
        const extension = resizeToThreeDimensionsController.getFileExtension("invalid format");
        expect(extension)
        .toEqual(new Error("Invalid mimetype format. It should be as 'filetype/extension'."));
    });

    test("Should return error: 'Invalid mimetype format. It should be as 'filetype/extension'.", () => {
        const extension = resizeToThreeDimensionsController.getFileExtension("invalid format");
        expect(extension)
        .toEqual(new Error("Invalid mimetype format. It should be as 'filetype/extension'."));
    });
})

describe('Test resizeToThreeDimensionsController - isAcceptedFileExtension', () => {
    test("Should return true if the input is a accepted file type.'", () => {
        const extension = resizeToThreeDimensionsController.isAcceptedFileExtension('jpeg');
        expect(extension)
        .toBe(true);
    });

    test("Should return error: 'Invalid file extension input. It should be a string.'", () => {
        const extension = resizeToThreeDimensionsController.isAcceptedFileExtension(null);
        expect(extension)
        .toEqual(new Error('Invalid file extension input. It should be a string.'));
    });
})