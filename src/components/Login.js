import Header from './Header'
const Login = () => {
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
      <form className="w-3/12 absolute my-36 p-12 bg-black mx-auto right-0 left-0 rounded-lg bg-opacity-70">
        <h1 className="font-bold text-white text-3xl py-4">Sign In</h1>
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full text-white bg-gray-700 rounded-lg"
        ></input>
        <input
          type="text"
          placeholder="Password"
          className="p-4 my-4 w-full text-white bg-gray-700 rounded-lg"
        ></input>
        <button className="p-4 my-6 w-full bg-red-700 text-white rounded-lg">
          Sign In
        </button>
      </form>
    </div>
  )
}

export default Login