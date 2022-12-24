import React, { useEffect, useState } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import Post from '../Post/Post';

import classes from './Posts.module.css'

export default function Posts(props) {

  const [posts, setPosts] = useState([]);
  // const [userName, setUserName] = useState('');

  useEffect(() => {
    setPosts(props.posts)
  }, [props.posts])

  // useEffect(() => {
  //   setUserName(props.displayName)
  //   console.log('username changed')
  // }, [props.displayName])

  // console.log(userName)

  return (
    <>
      <div className={classes.post_container}>
        {
          posts?.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              currentUser={props?.displayName}
              username={post.userName}
              imageURL={post.imageURL}
              caption={post.caption}
              likes={post?.likes}
              uid={props.uid} />
          )
          )
        }
      </div>

      <div className={classes.postUploader}>
        {
          props.displayName ? (
            <ImageUpload username={props.displayName} />
          ) : (
            <h4 className={classes.login_pera}>Log In To Upload Posts</h4>
          )
        }
      </div>
    </>
  )
}
