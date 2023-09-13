import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { db } from '../../firebase'
import { addDoc, collection ,serverTimestamp} from 'firebase/firestore'
import { useAuth } from '../../../contexts/AuthContext'
import { ROOT_FOLDER } from '../../../hooks/useFolder'

const AddFolderButton = ({currentFolder}) => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const {currentUser} = useAuth()
    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        if(currentFolder == null) return

        //this is for the breadcrumbs. In this way, we get al the previous folders in order.
        const path = [...currentFolder.path]
        if(currentFolder != ROOT_FOLDER)
        {
            path.push({name: currentFolder.name, id: currentFolder.id})
        }

        //Adding a new folder to the database
        try {
            const data = await addDoc(collection(db,"folders"),{
                  name: name,
                  userId: currentUser.uid,
                  parentId: currentFolder.id,
                  path:path,
                  createdAt: serverTimestamp()
              })
              console.log(data);
            } catch (error) {
        console.error(error);
            }
            setName("")
            closeModal()        
    }
  return (
    <>
    <Button variant='outline-success' onClick={openModal}>
      <FontAwesomeIcon icon={faFolderPlus} />
    </Button>
    <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Folder Name</Form.Label>
                    <Form.Control 
                    type='text'
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}

                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={closeModal}>Close</Button>
                <Button variant='success' type='submit'>Add Folder</Button>
            </Modal.Footer>
        </Form>
    </Modal>
    </>
  )
}

export default AddFolderButton
