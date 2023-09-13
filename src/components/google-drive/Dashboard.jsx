import React from 'react'
import NavbarComponent from './NavbarComponent'
import { Container } from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import useFolder from '../../../hooks/useFolder'
import Folder from './Folder'
import { useParams, useLocation } from 'react-router-dom'
import FolderBreadCrumbs from './FolderBreadCrumbs'
import AddFileButton from './AddFileButton'
import File from './File'



const Dashboard = () => {
  const {folderId} = useParams()
  const {state={}} = useLocation()
  const {folder,childFolders, childFiles} = useFolder(folderId, state?.folder)
  // console.log(childFolders);
  
  return (
    <>
    <NavbarComponent />
    <Container fluid>
      <div className='d-flex align-items-center justify-center'>
        <FolderBreadCrumbs currentFolder={folder} />
      <AddFileButton  currentFolder={folder}/> 
      <AddFolderButton currentFolder={folder}/>
      </div>
    {childFolders.length > 0 && (
      <div className='d-flex flex-wrap'>
        {childFolders.map((childFolder) =>{
          return (
            <div
            key={childFolder.id}
            style={{maxWidth: '250px'}}
            className='p-2'
            >
              <Folder folder={childFolder} />
            </div>
          )
        })}
      </div>
    )}
    {childFolders.length > 0 && childFiles.length > 0 && <hr />}
    {childFiles.length > 0 && (
      <div className='d-flex flex-wrap'>
        {childFiles.map((childFile) =>{
          return (
            <div
            key={childFile.id}
            style={{maxWidth: '250px'}}
            className='p-2'
            >
              <File file={childFile} />
            </div>
          )
        })}
      </div>
    )}
    </Container>
    </>
  )
}

export default Dashboard
