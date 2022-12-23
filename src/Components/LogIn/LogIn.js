import { Modal } from "@mui/material";
import React from "react";
import classes from './LogIn.module.css'

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

      <div className={classes.SignUp_footer}>
        <p>Dont have an Acount?</p>
        <p onClick={props.signUpOpen} className={classes.loginLink}>Sign Un</p>
      </div>
    </form>
  </Modal>
);

export default LogIn;
