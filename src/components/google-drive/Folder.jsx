import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Folder = ({folder}) => {
  return (
    <Button 
    as={Link}
    to={`/folder/${folder.id}`}
    state={folder= {folder}}
     variant='outline-dark' 
     className='text-truncate w-100'
     >
    <FontAwesomeIcon icon={faFolder} style={{paddingRight: "0.5rem"}}/>
      {folder.name}
    </Button>
  )
}

export default Folder
