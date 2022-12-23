import React, { useEffect, useState } from 'react';
import classes from './Post.module.css'

import { Avatar } from '@mui/material';
import { addDoc, doc, collection, deleteDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import dots from './../../Assest/dots.png';

function Post(props) {
    const [comments, setComments] = useState([]);
    const [likeDetail, setLikeDetail] = useState([]);
    const [comment, setComment] = useState('');
    const [showdeleteBtn, setShowDeleteBtn] = useState(false);
    const [liked, setLiked] = useState(false)


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

    const deletePostHandler = async (username) => {
        let postUsername = username.toLowerCase();
        let currentUserName = props.currentUser?.toLowerCase();
        (postUsername === currentUserName) ? await deleteDoc(doc(db, 'posts', props.postId)) : alert('You Cant Delete Others Posts!')
        setShowDeleteBtn(false)
    }

    function showDeleteBtnHandler() {
        setShowDeleteBtn(!showdeleteBtn)
    }


    const likeHandler = (postId) => {
        if (liked) {
            setLiked(false)
            updateDoc(doc(db, "posts", (postId)), {
                likes: props.likes - 1
            }
            ).then((res) => {})
            .catch((error) => console.log(error))
        }else{
            setLiked(true)
            updateDoc(doc(db, "posts", (postId)), {
                likes: props.likes + 1
            }
            ).then((res) => {})
            .catch((error) => console.log(error))
        }
    }

    return (
        <div className={classes.post}>
            
            <div className={classes.post_header}>
                <div className={classes.avatar}>
                    <Avatar
                        className={classes.post_avatar}
                        alt={props.username}
                        src='/' />
                    <h4>{props.username}</h4>
                </div>
                <img src={dots} onClick={showDeleteBtnHandler} alt="menu" />
                <button className={showdeleteBtn ? classes.delete_btn : ''} onClick={() => deletePostHandler(props.username)}>Delete</button>
            </div>

            <div className={classes.post_image}><img src={props.imageURL} alt='post_image' onDoubleClick={() => likeHandler(props.postId)} /></div>

            <div className={classes.func}><div className={classes.heart} onClick={() => likeHandler(props.postId)} style={{ backgroundColor: liked ? 'red' : "" }} /><div className={classes.likes}>{props.likes} Likes</div>Share Comment</div>

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