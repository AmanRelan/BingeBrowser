import { useRef, useState } from 'react'
import Header from './Header'
import { validateData } from '../utils/validate'
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null)
  const password = useRef(null)
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  const handleButtonClick = () => {
    const message = validateData(email.current.value, password.current.value)
    setErrorMessage(message)
    if (message) return
    if (!isSignInForm) {
      //Sign up logic 
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          console.log(userCredential.user)
          updateProfile(userCredential.user, {
            displayName: name.current.value,
            photoURL: 'https://avatars.githubusercontent.com/u/22621253?v=4'
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }))
            navigate("/browse")
          }).catch((error) => {
            setErrorMessage(error.message)
          })
        })
        .catch((error) => console.log(setErrorMessage(error.code + '- ' + error.message)))
    } else {
      // Sign IN Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User is Signed in. The signed in user is:- ", user)
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("There was some error signing in the user:- ", errorCode + '=>' + errorMessage)
          setErrorMessage(errorMessage);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className="absolute w-full">
        <img
          className="w-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c83921/IN-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bgPreview"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute my-36 p-12 bg-black mx-auto right-0 left-0 rounded-lg bg-opacity-70"
      >
        <h1 className="font-bold text-white text-3xl py-4">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-4 my-4 w-full text-white bg-gray-700 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full text-white bg-gray-700 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full text-white bg-gray-700 rounded-lg"
        ></input>
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 w-full bg-red-700 text-white rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p
          className="py-4 text-white font-bold cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? 'New To Netflix? Sign Up Now'
            : 'Already Registered? Sign In Now'}
        </p>
      </form>
    </div>
  )
}

export default Login
