import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { ROOT_FOLDER } from '../../../hooks/useFolder'
import { Link } from 'react-router-dom'

const FolderBreadCrumbs = ({currentFolder}) => {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    // console.log(currentFolder.path);
    if(currentFolder) path = [...path, ...currentFolder.path]
  return (
    <Breadcrumb 
    className='flex-grow-1'
    listProps={{className: "bg-white pl-0 m-0"}}
    >
        {path.map((folder,index) => (
            <Breadcrumb.Item
            key={index}
            linkAs={Link}
            linkProps={{
                // to: {
                //     pathname: folder.id ? `/folder/${folder.id}`: '/',
                //     state: {folder: {...folder, path: path.slice(1,index)}}
                // } 
                to: folder.id ? `/folder/${folder.id}`: '/',
                state: {folder: {...folder, path: path.slice(0,index)}}
            }}
            className='text-truncate d-inline-block'
            style={{maxWidth: "150px"}}
            >
                {folder.name}
            </Breadcrumb.Item>
        ))}
      {currentFolder && (
        <Breadcrumb.Item
        className='text-truncate d-inline-block'
        style={{maxWidth: "200px"}}
        active
        >
            {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}

export default FolderBreadCrumbs
