import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import classes from './Stories.module.css'
import Story from './Story/Story'

export default function Stories() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        onSnapshot(collection(db, "Users"), (snapshot) => {
            setUsers(snapshot.docs.map(doc => ({
                id: doc.id,
                user: doc.data()
            })))
        })
    }, [])

    console.log(users)

    return (
        <div className={classes.stories}>
            {
                users.map((user) => (
                    <Story
                        key={user.id}
                        userName={user.user.UserName}
                        profileImg={user.user?.profileImg} />
                )
                )
            }
        </div>
    )
}
