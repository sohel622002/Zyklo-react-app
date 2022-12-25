import React, { useEffect, useState } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import Post from '../Post/Post';
import Stories from '../Stories/Stories';

import classes from './Posts.module.css'

export default function Posts(props) {

  const [posts, setPosts] = useState([]);
  // const [userName, setUserName] = useState('');

  useEffect(() => {
    setPosts(props.posts)
  }, [props.posts])

  return (
    <div className={classes.container}>
      <Stories />
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
    </div>
  )
}
