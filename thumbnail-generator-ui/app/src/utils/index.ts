export function arrayBufferToBase64(arrayBuffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(arrayBuffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export function loadDataFromFile(file: File) {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e?.target?.result);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(file);
    });
};

export function typeOfObject(object: any) {
    const objectType = Object.prototype.toString.call(object);
    return objectType.match(/^\[object ([a-zA-Z]*)\]$/)?.[1];
  }