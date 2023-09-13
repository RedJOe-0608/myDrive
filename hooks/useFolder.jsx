import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useReducer } from 'react'
import { db } from '../src/firebase'
import { useAuth } from '../contexts/AuthContext'

const ACTIONS ={
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders',
  SET_CHILD_FILES: 'set-child-files',
}

export const ROOT_FOLDER = {name: 'Root',id: null,path:[]}


function reducer(state, {payload, type}){
  switch(type){
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: []
      }
      case ACTIONS.UPDATE_FOLDER:
        return {
          ...state,
          folder: payload.folder
        }
      case ACTIONS.SET_CHILD_FOLDERS:
        return {
          ...state,
          childFolders: payload.childFolders
        }
      case ACTIONS.SET_CHILD_FILES:
        return {
          ...state,
          childFiles: payload.childFiles
        }

      default:
        return state  
  }
}


const useFolder = (folderId = null, folder = null) => {
  const {currentUser} = useAuth()
  const [state, dispatch] = useReducer(reducer,{
    folderId,
    folder,
    childFolders: [],
    childFiles: []
  })

  useEffect(() =>{
    dispatch({type: ACTIONS.SELECT_FOLDER,payload: {folderId,folder}})
  },[folderId, folder])

  useEffect(() =>{
    if(folderId == null){
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {folder: ROOT_FOLDER}
      })
    }

const fetchDoc = async() => {
      try {
       const document = await getDoc(doc(db,"folders", folderId))
       const formattedDoc = {
        id: document.id,
        ...document.data()
       }
       dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {folder: formattedDoc}
      })
        console.log(formattedDoc);
      } catch (error) {
        console.log(error);
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: {folder: ROOT_FOLDER}
        })
      }
    }
    fetchDoc()
  },[folderId])


useEffect(() => {
    let w1 = where("parentId" ,"==",folderId)
    let w2 = where("userId" ,"==",currentUser?.uid || ' ')
    const q = query(collection(db,"folders"),w1,w2,orderBy("createdAt"))
  const unsubscribe = onSnapshot(q, snapshot => {
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: {childFolders: snapshot.docs.map(doc =>{
          const formattedDoc = {
            id: doc.id,
            ...doc.data()
           }
           return formattedDoc
        })}
      })
    })

    return () => unsubscribe()
   
  },[currentUser,folderId])


useEffect(() => {
    let w1 = where("folderId" ,"==",folderId)
    let w2 = where("userId" ,"==",currentUser?.uid || ' ')
    const q = query(collection(db,"files"),w1,w2,orderBy("createdAt"))
  const unsubscribe = onSnapshot(q, snapshot => {
    // console.log(snapshot.docs);
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: {childFiles: snapshot.docs.map(doc =>{
          const formattedDoc = {
            id: doc.id,
            ...doc.data()
           }
           return formattedDoc
        })}
      })
    })

    return () => unsubscribe()
   
  },[currentUser,folderId])

 
  return state
}

export default useFolder
