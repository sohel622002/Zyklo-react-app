import React from 'react'

import classes from './Story.module.css'

export default function Story({userName, profileImg}) {
    return (
        <div className={classes.Single_Story}>
            <div className={classes.Single_Story_Img}>
                {profileImg ? <img src={profileImg}/> : <h4>{userName.charAt(0)}</h4>}
            </div>
            <p className={classes.Single_Story_Name}>{userName}</p>
        </div>
    )
}
