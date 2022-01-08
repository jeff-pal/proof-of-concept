import styled from 'styled-components';

const getBackgroundColor = (props: any) => {
  if (props.isDragAccept) {
    return '#ffeeee';
  }
  if (props.isDragReject) {
    return 'orange';
  }
  if (props.isDragActive) {
    return 'green';
  }
  return '#f9f9f9';
};

const getBorderColor = (props: any) => {
  if (props.isDragAccept) {
    return '#aa95ff';
  }
  return '#cccccc';
};

const StyledDragAndDropFileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  border: 3px dashed ${(props) => `${getBorderColor(props)}`};
  border-radius: 2px;
  background-color: ${(props) => `${getBackgroundColor(props)}`};
  color: darkgray;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`;

export default StyledDragAndDropFileArea;
