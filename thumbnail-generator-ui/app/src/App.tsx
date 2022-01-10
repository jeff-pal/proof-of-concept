import React                from 'react';
import axios                from 'axios';
import { useAuth0 }         from '@auth0/auth0-react';
import { 
  ToastContainer,
  toast }                   from 'react-toastify';
import {
  Column,
  DefaultDragAndDropContent,
  DragAndDropFile,
  LoginButton,
  LogoutButton }            from './components';
import { loadDataFromFile } from './utils';  

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const api = axios.create({
  baseURL: process.env.REACT_APP_THUMBNAIL_API
});

async function handleRejectedFile(file: any) {
  toast(file?.errors?.[0]?.message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'dark',
    type: 'warning',
  })
}

async function handleAcceptedFile(file: File, binaryStr: any, setPreviewSrc: any, setFile: any) {
  try {
    const url: any = await loadDataFromFile(file);
    setPreviewSrc(url);
    setFile(file);
  } catch (error) {
    console.error('The file read fails.');
  }
}

function App() {
  const { 
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently }                        = useAuth0();
  const [ resizedThumbnails, setResizedThumbnails ] = React.useState([]);
  const [ previewSrc, setPreviewSrc ]               = React.useState<string>();
  const [ file, setFile ]                           = React.useState<File>();
  const [ processingImage, setProcessingImage ]     = React.useState<boolean>();
    
  async function generateThumbnails(file: File) {
    if(isAuthenticated) {
      const token = await getAccessTokenSilently();
      const formData = new FormData();
      formData.append('image_to_be_resized',file)
      
      try {
        setProcessingImage(true);
        const response = await api.post('/thumbnail/resize-to-three-dimensions', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        })
        if (response) {
          setResizedThumbnails(response.data);
        }
        setProcessingImage(false);
      } catch (error: any) {
        setProcessingImage(false);
        if(error.response.status === 413) {
          alert(error?.response.data)
        }
        console.error(error);
      }
    } else {
      console.error('Unauthorized. Please log in!');
    }
  }

  const Thumbnails = () => (
    <div>
      {
        resizedThumbnails.map((image: any, index) => (
          <a
            key={index}
            href={image?.url}
            rel='noreferrer'
            target='_blank'
          >
            <Column>
              <img
                alt='Thumbnail'
                src={image?.url}
                style={{ margin: '10px' }}
              />
              <span>{image?.dimension?.width}x{image?.dimension?.height}</span>
            </Column>
          </a>
        ))
      }
    </div>
  )

  const PrivateContent = () => (
    <Column>
      <img
        alt='user'
        src={user?.picture || 'assets/images/user.png'}
        style={{ 
          width: '5vh',
          height:'5vh',
          borderRadius: '50%'
        }}
        onError={() => {
          if(user) {
            user.picture = ''
          }
        }}
      />
      <LogoutButton />
      <div>
        <DragAndDropFile
          multiple={false}
          accept="image/jpeg, image/jpg, image/png"
          handleAcceptedFiles={(file: File, binaryStr: any) => handleAcceptedFile(file, binaryStr, setPreviewSrc, setFile)}
          handleRejectedFiles={handleRejectedFile}
          maxSize={5242880}
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
        <button
          className='button-light'
          onClick={() => generateThumbnails(file)}
          disabled={processingImage}
        >
          {processingImage ? 'Processing...' : 'Confirm'}
        </button>
      }
      <Thumbnails />
    </Column>
  );

  function PublicContent() {
    return (
      <Column style={{ width: '80%'}}>
        <h1>Welcome to the Thumbnail Generator App</h1>
        <h2>First of all, let's <LoginButton />!</h2>
        
        <div style={{ width: '100%' }}>
          <img 
            alt='Flow'
            src='assets/images/steps.svg'
            style={{ width: '65%' }}
          />
        </div>
      </Column>
    )
  }

  return (
    <div className="App">
      <Column style={{ width: '100%' }}>
        {
          isLoading ? 'Loading...' : (
            isAuthenticated ?
            <PrivateContent /> :
            <PublicContent />
          )
        }
      </Column>
      <ToastContainer />
    </div>
  );
}

export default App;
