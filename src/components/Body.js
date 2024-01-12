import Login from './Login'
import Browse from './Browse'
import SignUp from './SignUp'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/browse',
      element: <Browse />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }))
      } else {
        dispatch(removeUser())
      }
    })
  }, [])

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
