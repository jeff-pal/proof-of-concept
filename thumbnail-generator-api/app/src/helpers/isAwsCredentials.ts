export default (value) => {
    return (
        (typeof value?.accessKeyId) === 'string' &&
        (typeof value?.secretAccessKey) === 'string'
    )
}