import React, { useCallback }    from 'react';
import { useDropzone }           from 'react-dropzone';
import StyledDragAndDropFileArea from './DragAndDropFile.style';

export const DragAndDropFile = (props: any) => {
  const dependencies = props?.dependencies?.length ? [...props.dependencies] : [props.dependencies]
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        props.handleFile(file, binaryStr);
      }
      reader.readAsArrayBuffer(file)
    })
  }, dependencies)

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop, accept: props.accept})

  return (
    <StyledDragAndDropFileArea {...props} {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps({ multiple: props.multiple })} />
      {props.children}
    </StyledDragAndDropFileArea>
  )
}