import Image from '../adapters/imageBuffer';
import types from '../types';

jest.mock('aws-lambda-resize-img', () => {
    return () => Buffer.alloc(10);
})

//sut factory
function makeSystemUnderTest() {
    return new Image();
}

describe('Test Image', () => {
    const options: types.Dimension = { width: 100, height: 100 }

    test("Should return a Buffer", async () => {
        const systemUnderTest = makeSystemUnderTest();
        const file            = { data: Buffer.from('test image buffer') }
        const resizedImage    = await systemUnderTest.resize(file, options);
        expect(resizedImage).toBeInstanceOf(Buffer);
    })

    test("Should return an Error if the file buffer is empty.", async () => {
        const systemUnderTest = makeSystemUnderTest();
        const file            = { data:  Buffer.alloc(0) }
        const resizedImage    = await systemUnderTest.resize(file, options);

        expect(resizedImage).toEqual(new Error('The file buffer is empty'));
    })

    test("Should return an Error if the file buffer is not a Buffer instance of.", async() => {
        const systemUnderTest = makeSystemUnderTest();
        // @ts-ignore - with this command we ignore type checking for the line bellow.
        const resizedImage = await systemUnderTest.resize(null, options);

        expect(resizedImage).toEqual(new Error('Invalid file format. The file is not a Buffer.'));
    })

    test("Should return an Error if the size(image dimension) is invalid.", async () => {
        const systemUnderTest = makeSystemUnderTest();
        const file            = { data: Buffer.from('test image buffer') }
        // @ts-ignore - with this command we ignore type checking for the line bellow.
        const resizedImage = await systemUnderTest.resize(file, null);

        expect(resizedImage).toEqual(new Error('Invalid image dimension.'));
    })
});