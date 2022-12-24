import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../../firebase';

import Myposts from '../MyPosts/Myposts';
import './User.css';

export default function User(props) {

  const posts = props.posts

  let mypost = []

  for(let i = 0; i < posts.length; ++i){
    if(posts[i].post.userName === props.userName){
      mypost.push(posts[i])
    }
  } 

  return (
    <>
    <div className="Avatar">
      Upload Profile Pic
    </div>
    <h2 className='username'>{props.userName ? props.userName : 'UserName'}</h2>
    <h4 className='email'>Email : {props.Email}</h4>
    <div className='my_posts'>
      <h4 className='post_title'>My Posts</h4>
      <div className='grid'>
        {
          mypost?.map(({id, post}) => (
            <Myposts key={id} post_image_url={post.imageURL} likes={post.likes}/>
          ))
        }
      </div>
      <button onClick={() => signOut(auth)} className='navbtn'>Log Out</button>
    </div>
    </>
  )
}
