import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import appContext from '../context/auth/authContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const app_context = useContext(appContext)
    const {login,setLoggedIN, getUser} = app_context

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.target.classList.add('animate-bounce')
        if(email.length > 6 && password.length > 6) {
            const json = await login(email, password)
            if(json.authToken) {
                localStorage.setItem("blogApp-token", json.authToken)
                setLoggedIN(true)
                await getUser()
                navigate("/")
            }
            else{
                alert(json.message)
            } 
        }
        else {
            alert("please provide email and password of atleast 6 characters")
        }
        e.target.classList.remove('animate-bounce')
    }

    useEffect(() => {
        if (localStorage.getItem("taskapp-token")) {
            setLoggedIN(true)
            navigate("/")
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flex justify-center items-center h-[92vh] bg-gray-100">
            <form className="w-1/4 xl:w-2/5 sm:w-4/5 flex flex-col justify-center align-middle bg-white drop-shadow-md rounded-xl px-8 pt-6 pb-8">
                <h2 className="text-xl text-center mb-8 font-normal">Please login 👨‍💻</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="my-font drop-shadow hover:drop-shadow-md rounded-lg w-11/12 py-2 px-3 text-gray-700"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="my-font drop-shadow hover:drop-shadow-md rounded-lg w-11/12 py-2 px-3 text-gray-700"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center flex-col">
                    <button
                        className="bg-orange-400 text-white font-bold py-2 px-4 rounded w-full mb-4"
                        onClick={handleSubmit}>
                        Log In
                    </button>
                    <p className="text-sm text-gray-600 mb-2">Not a user?</p>
                    <button
                        className="bg-orange-400 text-white font-bold py-2 px-4 rounded w-full"
                        type="button"
                        onClick={() => {
                            navigate("/signup")
                        }}
                        >
                        Sign Up 🚀
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login