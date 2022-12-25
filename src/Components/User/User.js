import { signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../../firebase';

import Myposts from '../MyPosts/Myposts';
import './User.css';
import camera from '../../Assest/camera.png'
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function User(props) {

  const [wait, setWait] = useState(false)
  const [url, setUrl] = useState('')

  const posts = props.posts

  let mypost = []

  for (let i = 0; i < posts.length; ++i) {
    if (posts[i].post.userName === props.user.displayName) {
      mypost.push(posts[i])
    }
  }

  useEffect(()=>{
    setUrl(props.user?.photoURL)
  },[props.user?.photoURL])

  const imageUploadHandler = (event) => {

    let image = '';

    if (event.target.files[0]) {
      image = event.target.files[0]
    }

    if(image == null) return;

    const imageRef = ref(storage, `profileImages/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image)

    uploadTask.on(
      "state_changed",
      (snapshot) => { setWait(true) },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url)
            updateDoc(doc(db, "Users", (props.user.uid)), {
              profileImg: url
            })
            updateProfile(props.user, {
              photoURL: url
            })
          }).catch((error)=>{
            console.log(error)
          })
          setWait(false)
      }
    )


  }

  return (
    <>
      <div className="Avatar">
        {url ? <img src={url} className='image' alt='profile'/> : "Upload Profile Pic"}
        <label htmlFor='profilrImgPiker'>
          {wait ? <div className="loader">Loading...</div> : <img src={camera} alt='camera_png'/>}
          <input id='profilrImgPiker' type='file' onChange={imageUploadHandler} disabled={wait}/>
        </label>
      </div>
      <h2 className='username'>{props.user?.displayName ? props.user.displayName : 'UserName'}</h2>
      <h4 className='email'>Email : {props.user?.email}</h4>
      <div className='my_posts'>
        <h4 className='post_title'>My Posts</h4>
        <div className='grid'>
          {
            mypost?.map(({ id, post }) => (
              <Myposts key={id} post_image_url={post.imageURL} likes={post.likes.length} />
            ))
          }
        </div>
        <button onClick={() => signOut(auth)} className='navbtn'>Log Out</button>
      </div>
    </>
  )
}
