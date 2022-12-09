import React, { useEffect, useState } from 'react';
import classes from './Post.module.css'

import { Avatar } from '@mui/material';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../../Container/firebase';

function Post(props) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');


    useEffect(() => {
        let unsubscribe;
        if (props.postId) {
            unsubscribe = onSnapshot(query(collection(db, "posts", (props.postId), 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
                setComments(snapshot.docs.map(doc => ({
                    id: doc.id,
                    comment: doc.data()
                })
                ));
            })
        }
        return () => {
            unsubscribe();
        }
    }, [props.postId]);


    const postComment = (event) => {
        event.preventDefault();

        addDoc(collection(db, "posts", (props.postId), 'comments'), {
            text: comment,
            userName: props.currentUser,
            timestamp: serverTimestamp()
        })
            .then((res) => {
                setComment('')
            })
            .catch(() => { })

    }

    return (
        <div className={classes.post}>
            <div className={classes.post_header}>
                <Avatar
                    className={classes.post_avatar}
                    alt={props.username}
                    src='/' />
                <h4>{props.username}</h4>
            </div>
            <div className={classes.post_image}><img src={props.imageURL} alt='post_image' /></div>
            <div className={classes.func}>like Share Comment</div>
            <div className={classes.user_caption}>
                <h4>{props.username}</h4>{props.caption}<br />
            </div>
            <div className={classes.comments}>
                {
                    comments.map(({ id, comment }) => (
                        <p key={id}><b>{comment.userName}</b>{comment.text}</p>
                    ))
                }
            </div>

            {console.log(props.currentUser)}

            {props.currentUser &&
                (<form className={classes.comment_input}>

                    <input
                        className='post_input'
                        type='text'
                        placeholder="Add a Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} />

                    <button
                        className='post_button'
                        disabled={!comment}
                        type='submit'
                        onClick={postComment}>COMMENT</button>

                </form>)
            }
        </div>
    )
}

export default Post;