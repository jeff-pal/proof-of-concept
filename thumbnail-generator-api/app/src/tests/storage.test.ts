import Storage from '../adapters/awsS3';

describe('Storage Tests', () => {
    test('Should return a string', () => {
        const storage = new Storage();
        const fileBuffer = Buffer.from('test')
        const link = storage.store(fileBuffer);

        expect(typeof link).toBe('string');
    })

    test('Should return an Error if the file buffer is empty.', () => {
        const storage = new Storage();
        const fileBuffer = Buffer.alloc(0)
        const link = storage.store(fileBuffer);

        expect(link).toEqual(new Error('The file buffer is empty'));
    })
    
    test("Should return an Error if the file buffer is not a Buffer instance of.", () => {
        const storage = new Storage();
        // @ts-ignore - with this command we ignore type checking for the line bellow.
        const link = storage.store();

        expect(link).toEqual(new Error('Invalid file format. The file is not a Buffer.'));
    })
});