import { useRef, useState } from 'react'
import Header from './Header'
import { validateData } from '../utils/validate'
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const email = useRef(null)
  const password = useRef(null)

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  const handleButtonClick = () => {
    //Validate the form data
    const message = validateData(email.current.value, password.current.value)
    setErrorMessage(message)

    // Sign In/ Sign up
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
