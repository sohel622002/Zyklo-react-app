import React from 'react'

import './Myposts.css'

export default function Myposts(props) {
  return (
    <div className='my_post'>
        <img src={props.post_image_url} alt='my_post_image'/>
    <div className='post_likes'>
      {props.likes} Likes
    </div>
    </div>
  )
}
