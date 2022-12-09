import { Modal } from "@mui/material";
import React from "react";
import classes from '../../Container/zyklo.module.css'

const SignUp = (props) => (
    <Modal
        className={classes.modal}
        open={props.open}
        onClose={props.onclose}
      >
        <form className={classes.Signup_Page}>
          <h4>Zyklo</h4>

          <input
            placeholder='userName'
            type='text'
            value={props.username}
            onChange={props.onuserchange} />

          <input
            placeholder='Email'
            type='text'
            value={props.email}
            onChange={props.onemailchange} />

          <input
            placeholder='Password'
            type='password'
            value={props.password}
            onChange={props.onpasschange} />

          <button onClick={props.signUp}>Sign Up</button>
        </form>
      </Modal>
)
export default SignUp