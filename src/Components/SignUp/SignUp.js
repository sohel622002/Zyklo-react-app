import { Modal } from "@mui/material";
import React from "react";
import classes from './SignUp.module.css'

const SignUp = (props) => (
  <Modal
    className={classes.modal}
    open={props.open}
    onClose={props.onclose}
  >
    <form className={classes.Signup_Page}>
      <h4>Zyklo</h4>

      {
        props.error ? (<div className={classes.error}>
          {props.error}
        </div>) : null
      }


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

      <input
        placeholder='Confirm Password'
        type='password'
        value={props.confirmpassword}
        onChange={props.onconfirmpasschange} />

      <button onClick={props.signUp}>Sign Up</button>
      <div className={classes.SignUp_footer}>
        <p>Already have an Acount?</p>
        <p onClick={props.signInOpen} className={classes.loginLink}>Log In</p>
      </div>
    </form>
  </Modal>
)
export default SignUp