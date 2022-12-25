import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, doc, orderBy, query, setDoc } from '@firebase/firestore';
import classes from './zyklo.module.css'


import { onSnapshot } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import SignUp from '../Components/SignUp/SignUp';
import LogIn from '../Components/LogIn/LogIn';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Posts from '../Components/Posts/Posts';
import User from '../Components/User/User';



function Zyklo() {

  const [posts, setPosts] = useState([]);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');


  useEffect(() => {
    onSnapshot(query(collection(db, "posts"), orderBy('ceatedAt', 'desc')), (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])


  const signUp = async (event) => {
    event.preventDefault();

    if (password !== confirmpassword) { return setError('password not matched') }

    if (!username) { return setError('UserName Required') }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log("updated")
        updateProfile(userCred.user, {
          displayName: username
        });
        setUser(userCred.user);
        setSignUpOpen(false);
        console.log(userCred)
        return setDoc(doc(db, "Users", userCred.user.uid), {
          profileImg: '',
          UserName: username
        });
      }).then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
      })

  }

  const signIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log('logedin')
        setUser(userCred.user);
        setSignInOpen(false);
      })
      .catch((error) => {
        setError(error.message)
      })
  }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //user is still loged in
        setUser(authUser)
      } else {
        //user has loged out
        setUser(null);
      }
    })
    return () => {
      //some cleanup function...
      unSubscribe();
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  // console.log(user)
  // console.log(location)

  useEffect(() => {
    setTimeout(function () {
      setError('')
    }, 7000)
  }, [error])

  console.log(user)

  return (
    <>
      {/* signup modal*/}
      <SignUp
        open={signUpOpen}
        onclose={() => setSignUpOpen(false)}
        username={username}
        email={email}
        password={password}
        confirmpassword={confirmpassword}
        error={error}
        onuserchange={(e) => setUsername(e.target.value)}
        onemailchange={(e) => setEmail(e.target.value)}
        onpasschange={(e) => setPassword(e.target.value)}
        onconfirmpasschange={(e) => setConfirmPassword(e.target.value)}
        signInOpen={() => {
          setSignInOpen(true)
          setSignUpOpen(false)
        }}
        signUp={signUp} />

      {/* sign im modal */}
      <LogIn
        signInOpen={signInOpen}
        onclose={() => setSignInOpen(false)}
        email={email}
        password={password}
        error={error}
        onemailchange={(e) => setEmail(e.target.value)}
        onpasschange={(e) => setPassword(e.target.value)}
        signUpOpen={() => {
          setSignInOpen(false)
          setSignUpOpen(true)
        }}
        signIn={signIn} />


      <div className={classes.Header}>
        <h4>Zyklo</h4>
        <div className='btns'>
          {user ? (<>
            {/* <button onClick={() => signOut(auth)} className={classes.navbtn}>Log Out</button> */}
            {
              location.pathname === "/user" ? <button onClick={(e) => navigate('/')} className={classes.navbtn}>Home</button> :
                <>
                  <button onClick={() => signOut(auth)} className={classes.navbtn}>Log Out</button>
                  <button onClick={(e) => navigate('/user')} className={classes.navbtn}>My Account</button>
                </>
            }
          </>) : (<>
            <button onClick={() => setSignUpOpen(true)} className={classes.navbtn}>Sign Up</button>
            <button onClick={() => setSignInOpen(true)} className={classes.navbtn}>Log In</button>
          </>)
          }
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<Posts displayName={user?.displayName} posts={posts} uid={user?.uid} />} />
        <Route path="/user" element={<User user={user} posts={posts}/>} />
      </Routes>

    </>
  )
};

export default Zyklo;