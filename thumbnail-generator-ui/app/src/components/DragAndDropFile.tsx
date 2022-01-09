import React, { useCallback }    from 'react';
import { useDropzone }           from 'react-dropzone';
import StyledDragAndDropFileArea from './DragAndDropFile.styled';

type FileHandler = (file: File, binaryStr?: string | ArrayBuffer | null) => any;

function readFileAsArrayBuffer(file: File, handler: FileHandler) {
    if(file instanceof File) {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = async () => {
            const binaryStr = reader.result
            handler(file, binaryStr);
        }
        reader.readAsArrayBuffer(file)
    } else {
        handler(file);
    }
}

function useFilesHandlerCallback(handler: FileHandler, dependencies: any[]) {
    return useCallback((files) => {
        if(files && handler) {
            files.forEach((file: any) => {
                readFileAsArrayBuffer(file, handler);
            })
        }
    }, dependencies)
}

export const DragAndDropFile = (props: any) => {
    const dependencies   = props?.dependencies?.length ? [...props.dependencies] : [props.dependencies];
    const onDrop         = useFilesHandlerCallback(props.handleFile, dependencies);
    const onDropAccepted = useFilesHandlerCallback(props.handleAcceptedFiles, dependencies);
    const onDropRejected = useFilesHandlerCallback(props.handleRejectedFiles, dependencies);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        onDropRejected,
        onDropAccepted,
        accept: props.accept,
        maxSize: props.maxSize,
    })

    return (
        <StyledDragAndDropFileArea {...props} {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
            <input {...getInputProps({ multiple: props.multiple })} />
            {props.children}
        </StyledDragAndDropFileArea>
    )
}