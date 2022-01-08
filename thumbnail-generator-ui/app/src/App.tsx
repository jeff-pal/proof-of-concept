import React                from 'react';
import axios                from 'axios';
import { useAuth0 }         from '@auth0/auth0-react';
import {
  DefaultDragAndDropContent,
  DragAndDropFile,
  LoginButton,
  LogoutButton, }           from './components';


import { loadDataFromFile } from './utils';  
import './App.css';

const api = axios.create({
  baseURL: process.env.REACT_APP_THUMBNAIL_API
});

function App() {
  const { 
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently }                        = useAuth0();
  const [ resizedThumbnails, setResizedThumbnails ] = React.useState([]);
  const [ previewSrc, setPreviewSrc ]               = React.useState();
  const [ file, setFile ]                           = React.useState();
    
  async function generateThumbnails(file: File) {
    if(isAuthenticated) {
      const token = await getAccessTokenSilently();
      const formData = new FormData();
      formData.append('image_to_be_resized',file)
      
      try {
        const response = await api.post('/thumbnail/resize-to-three-dimensions', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
         })
         if(response) {
           setResizedThumbnails(response.data);
         }
        
      } catch (error: any) {
        if(error.response.status === 413) {
          alert(error?.response.data)
        }
        console.error(error);
      }
    } else {
      console.error('Unauthorized. Please log in!');
    }
  }

  async function handleFile(file: any, binaryStr: any) {
    try {
      const url: any = await loadDataFromFile(file);
      setPreviewSrc(url);
      setFile(file);
    } catch (error) {
      console.error('The file read fails.');
    }
  }

  const Thumbnails = () => (
    <div>
      {
        resizedThumbnails.map((imageUrl, index) => (
          <img key={index} alt="Thumbnail" src={imageUrl}/>
        ))
      }
    </div>
  )

  const PrivateContent = () => (
    <div>
      <div>
        <DragAndDropFile
          multiple={false}
          accept="image/jpeg, image/jpg, image/png"
          handleFile={handleFile}
          dependencies={isAuthenticated}
        >
          <div style={{
              width: '500px',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {
              previewSrc ?
              <img 
                alt="Loaded thumbnail file preview"
                src={previewSrc}
                style={{ maxWidth: '80%', maxHeight: '80%' }}
              /> :
              <DefaultDragAndDropContent />
            }
          </div>
        </DragAndDropFile>
      </div>
      {
        previewSrc &&
        file &&
        <button onClick={() => generateThumbnails(file)}>Confirm</button>
      }
      <Thumbnails />
    </div>
  );

  return (
    <div className="App">
      <header style={{
        display: 'flex',
        justifyContent: 'center',
        margin:'20px'
      }}>
        {
          isLoading ? 'Loading...' : (
            isAuthenticated ?
            <LogoutButton /> :
            <LoginButton />
          )
        }

      </header>
      <img alt='user' src={user?.picture} style={{ borderRadius: '50%' }}/>

      {
        isAuthenticated &&
        <PrivateContent />
      }
    </div>
  );
}

export default App;
