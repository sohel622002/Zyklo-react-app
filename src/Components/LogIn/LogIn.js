import { Modal } from "@mui/material";
import React from "react";
import classes from './LogIn.module.css'

const LogIn = (props) => (
  <Modal
    className={classes.modal}
    open={props.signInOpen}
    onClose={props.onclose}
  >
    <form className={classes.SignIn_Page}>
      <h4>Zyklo</h4>

      {
        props.error ? (<div className={classes.error}>
          {props.error}
        </div>) : null
      }

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

      <div className={classes.SignIn_footer}>
        <p>Dont have an Acount?</p>
        <p onClick={props.signUpOpen} className={classes.loginLink}>Sign Up</p>
      </div>
    </form>
  </Modal>
);

export default LogIn;
