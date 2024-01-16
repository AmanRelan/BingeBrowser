import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { appLogo, userAvatar } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)
  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
    })
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }))
        navigate('/browse')
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    })

    // Unsubscribe when component unmounts
    return () => { unsubscribe() }
  }, [])
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex justify-between">
      <img
        className="w-48"
        src={appLogo}
        alt="Logo"
      />
      {user && <div className="flex p-2">
        <img
          className="w-12 h-12"
          src={user?.photoURL || userAvatar} alt="user-icon" />
        <button className="font-bold text-white" onClick={handleSignOut}>Sign out</button>
      </div>}
    </div>
  )
}

export default Header
