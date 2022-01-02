import Image from './image';

describe('Image Tests', () => {
    test("Should return a Buffer", () => {
        const image = new Image();
        const imageBuffer = Buffer.from('test image buffer');
        const resizedImage = image.resize(imageBuffer);

        expect(resizedImage).toBeInstanceOf(Buffer);
    })

    test("Should return an Error if the file buffer is empty.", () => {
        const image = new Image();
        const imageBuffer = Buffer.alloc(0);
        const resizedImage = image.resize(imageBuffer);

        expect(resizedImage).toEqual(new Error('The file buffer is empty'));
    })

    test("Should return an Error if the file buffer is not a Buffer instance of.", () => {
        const image = new Image();
        // @ts-ignore - with this command we ignore type checking for the line bellow.
        const resizedImage = image.resize();

        expect(resizedImage).toEqual(new Error('Invalid file format. The file is not a Buffer.'));
    })
});