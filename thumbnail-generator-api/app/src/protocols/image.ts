export default interface Image {
    resize(file: Buffer): Buffer | Error;
}