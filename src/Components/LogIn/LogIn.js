import { Modal } from "@mui/material";
import React from "react";
import classes from '../../Container/zyklo.module.css'

const LogIn = (props) => (
    <Modal
        className={classes.modal}
        open={props.signInOpen}
        onClose={props.onclose}
      >
        <form className={classes.Signup_Page}>
          <h4>Zyklo</h4>

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

          <button onClick={props.signIn}>Sign In</button>
        </form>
      </Modal>
);

export default LogIn;
