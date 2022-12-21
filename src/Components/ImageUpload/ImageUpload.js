import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import './ImageUpload.css'

function ImageUpload({ username }) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);


    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleUpload = () => {
        if (image == null) return;

        const imageRef = ref(storage, `images/${image.name + Math.floor(Math.random() * (10000 - 1 + 1) + 1)}`);
        const uploadTask = uploadBytesResumable(imageRef, image)
        // .then(() => (console.log('uploaded..')))

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
                console.log(progress)
            },
            (error) => {
                console.log(error)
            },
            () => {
                console.log('fire')
                getDownloadURL(imageRef)
                    .then((url) => {
                        addDoc(collection(db, 'posts'), {
                            ceatedAt: serverTimestamp(),
                            caption: caption,
                            imageURL: url,
                            likes : 0,
                            userName: username
                        });

                        setImage(null);
                        setProgress(0);
                        setCaption('');
                    })
            }
        )
    }
    return (
        <div className="Image_Upload_Container">
            {/* <progress value={progress} max="100" /> */}
            <div className="bar" style={{ width: progress}}></div>
            <input type='file'
                onChange={handleChange} />

            <div className="caption_Btn">
                <input type='text'
                    placeholder="Enter A Caption"
                    value={caption}
                    onChange={event => setCaption(event.target.value)} />

                <button
                    className="ImageUpload_Button"
                    onClick={handleUpload}>
                    UPLOAD
                </button>
            </div>
        </div>
    );
};

export default ImageUpload;