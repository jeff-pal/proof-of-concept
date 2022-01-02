import Image from '../adapters/imageV1';
import imageTypes from '../types/imageTypes';

//sut factory
function makeSystemUnderTest() {
    const resizerStub     = (file, size) => file;
    const systemUnderTest = new Image(resizerStub);
    return systemUnderTest;
}

describe('Image Tests', () => {
    const size: imageTypes.Resolution = { width: 100, height: 100 }

    test("Should return a Buffer", () => {
        const systemUnderTest = makeSystemUnderTest();
        const imageBuffer = Buffer.from('test image buffer');
        const resizedImage = systemUnderTest.resize(imageBuffer, size);

        expect(resizedImage).toBeInstanceOf(Buffer);
    })

    test("Should return an Error if the file buffer is empty.", () => {
        const systemUnderTest = makeSystemUnderTest();
        const imageBuffer = Buffer.alloc(0);
        const resizedImage = systemUnderTest.resize(imageBuffer, size);

        expect(resizedImage).toEqual(new Error('The file buffer is empty'));
    })

    test("Should return an Error if the file buffer is not a Buffer instance of.", () => {
        const systemUnderTest = makeSystemUnderTest();
        // @ts-ignore - with this command we ignore type checking for the line bellow.
        const resizedImage = systemUnderTest.resize(null, size);

        expect(resizedImage).toEqual(new Error('Invalid file format. The file is not a Buffer.'));
    })

    test("Should return an Error if the size(image dimension) is invalid.", () => {
        const systemUnderTest = makeSystemUnderTest();
        const imageBuffer = Buffer.from('test image buffer');
        // @ts-ignore - with this command we ignore type checking for the line bellow.
        const resizedImage = systemUnderTest.resize(imageBuffer, null);

        expect(resizedImage).toEqual(new Error('Invalid image resolution.'));
    })
});