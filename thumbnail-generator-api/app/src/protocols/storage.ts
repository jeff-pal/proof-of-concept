export default interface Storage {
    store(file: Buffer): String | Error;
}