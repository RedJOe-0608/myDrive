import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { ROOT_FOLDER } from '../../../hooks/useFolder'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { useAuth } from '../../../contexts/AuthContext'
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import {v4 as uuidV4 } from 'uuid'
import { Toast } from 'react-bootstrap'
import { ProgressBar } from 'react-bootstrap'


const AddFileButton = ({currentFolder}) => {
  const [uploadingFiles, setUploadingFiles] = useState([])
    const {currentUser} = useAuth()
    const handleUpload = (e) =>{
        const file = e.target.files[0]
        if(currentFolder == null || file==null) return

        const id = uuidV4() 
        setUploadingFiles(prevUploadingFiles => [
          ...prevUploadingFiles,
          {id:id,name:file.name,progress: 0,error:false}
        ])

  let folderPath = currentFolder.path.map(item => item.name)
  let filteredFolderPath = folderPath.filter(item => item != 'Root')

     let filePath = currentFolder === ROOT_FOLDER ?
     `${file.name}` :
     `${filteredFolderPath.join('/')}/${currentFolder.name}/${file.name}`
    //  console.log(filePath);

    
     const storageRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);

// 'file' comes from the Blob or File API
const uploadTask = uploadBytesResumable(storageRef, file)


uploadTask.on("state-changed", (snapshot) => {
  const progress = snapshot.bytesTransferred /snapshot.totalBytes
  setUploadingFiles(prevUploadingFiles => {
    return prevUploadingFiles.map(uploadFile => {
      if(uploadFile.id === id){
        return {...uploadFile, progress: progress}
      }

      return uploadFile
    })
  })
},(err) => {
  setUploadingFiles(prevUploadingFiles => {
    return prevUploadingFiles.map(uploadFile => {
      if(uploadFile.id === id){
        return {...uploadFile, error: true}
      }
      return uploadFile
    })
  })
},() => {

  // console.log(uploadingFiles);
  setUploadingFiles(prevUploadingFiles => {
    return prevUploadingFiles.filter(uploadFile => {
      return uploadFile.id !== id
    })
  })
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
    const addToDatabase = async() => {

        try {
          // let w1 = where("name" ,"==",file.name)
          // let w2 = where("userId" ,"==",currentUser?.uid || ' ')
          // let w3 = where("folderId" ,"==",currentFolder?.id || ' ')
          // const q = query(collection(db,"files"),w1,w2,w3,orderBy("createdAt"))
        //   const existingFiles =  await getDocs(q)
        //   // console.log(existingFiles.docs);
        //   const getExistingFiles = onSnapshot(q,snapshot => {
        //     console.log(snapshot.docs[0]._document);
        //     const existingFile = snapshot.docs[0];
        //     // console.log(existingFile?.ref);
        //     if(existingFile)
        //     {
        //       // existingFile._document.data.value.mapValue.fields.url= downloadURL
        //       // existingFile?.ref?.update({ url: downloadURL}) 
        //     }
        // })

          
          // const getExistingFiles = async() => {
          //   const existingFiles =  await getDocs(q)
          //   console.log(existingFiles._snapshot);
          //   const existingFile = existingFiles._snapshot.docs[0]
          //   if(existingFile) {
          //     existingFile.ref.update({url: url})
          //   }
          //   else{
          //    await addDoc(collection(db,"files"),{
          //      url: downloadURL,
          //      name: file.name,
          //      userId: currentUser.uid,
          //      folderId: currentFolder.id,
          //      createdAt: serverTimestamp()
          //  })  
          //  }
          // }
          // getExistingFiles()


          
          await addDoc(collection(db,"files"),{
            url: downloadURL,
            name: file.name,
            userId: currentUser.uid,
            folderId: currentFolder.id,
            createdAt: serverTimestamp()
        })  
        
        } catch (error) {
          console.log(error);
        }
    }

    addToDatabase()
   
  });
})}


  return (
  <>

    <label className='btn btn-outline-success m-2 '>
      <FontAwesomeIcon icon={faFileUpload} />
      <input type="file" 
      onChange={handleUpload}
      style={{opacity: 0, position: "absolute", left: "-9999px"}}
      />
    </label>
    {uploadingFiles.length > 0 && (
      ReactDOM.createPortal(
        <div
        style={{position: "absolute", bottom: '1rem',right: '1rem',maxWidth: "250px"}}
        >
          {uploadingFiles.map(file =>(
            <Toast key={file.id} onClose={() => setUploadingFiles(prevUploadingFiles =>{
              return prevUploadingFiles.filter(uploadFile => uploadFile.id !== file.id)
            })}>
              <Toast.Header closeButton={file.error} className='text-truncate w-100 d-block'>
                {file.name}
              </Toast.Header>
              <Toast.Body>
                <ProgressBar 
                variant={file.error ? 'danger': "primary"}
                animated={!file.error}
                now={file.error ? 100 : file.progress *100}
                label={file.error ? "Error" : `${Math.round(file.progress * 100)}%`}


                />
              </Toast.Body>
            </Toast>
          ))}
        </div>,document.body
      )
    )}
    </>
  )
}

export default AddFileButton
