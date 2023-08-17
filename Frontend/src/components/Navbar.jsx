import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import authContext from '../context/auth/authContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const auth_context = useContext(authContext)
  const {loggedIN, setLoggedIN} = auth_context

  return (
    <>
      <nav className='bg-gray-300 text-black flex flex-row md:flex-col items-center justify-between min-h-[8vh]'>
        <h1 className="text-xl font-bold items-center justify-center  md:justify-center md:w-full ms-4 w-1/2">
          <Link to="/">
            BlogApp
          </Link>
        </h1>
        { !loggedIN &&
        <div className="flex flex-row md:flex-col font-normal justify-end md:justify-center md:items-center w-1/2 md:w-full me-4">
          <Link to="/login" className='mx-2'> Login </Link>
          <Link to="/signup" className='mx-2'> Sign up </Link>
        </div>}
        {loggedIN && <div className="flex flex-row md:flex-col font-normal justify-end md:justify-center md:items-center w-1/2 md:w-full me-4">
        <Link to='/profile' className='cursor-pointer'>Profile</Link>
          <p className='cursor-pointer ms-3' onClick={() => {
            localStorage.removeItem("blogApp-token")
            setLoggedIN(false)
            navigate("/")
          }}>LogOut</p>
          </div>}
      </nav>
    </>
  )
}

export default Navbar