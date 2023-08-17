import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import appContext from '../context/auth/authContext'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const app_context = useContext(appContext)
    const { signup } = app_context

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.target.classList.add('animate-bounce')
        if (password && password === confirmPassword) {

            try {
                const json = await signup(name, email, password)
                if (json.success) {
                    navigate("/login")
                }
            }
            catch (error) {
                alert(error)
            }
        } else {
            alert("password and confirm password didn't match")
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
            <form className="w-1/4 xl:w-2/5 sm:w-4/5 bg-white shadow-md rounded-lg px-8 pt-6 pb-8 ">
                <h2 className="text-2xl text-center mb-8 font-normal">Sign Up 🚀</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Name
                    </label>
                    <input
                        className="my-font drop-shadow hover:drop-shadow-md rounded-lg w-11/12 py-2 px-3 text-gray-700"
                        id="name"
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <div className="mb-4">
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
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="my-font drop-shadow hover:drop-shadow-md rounded-lg w-11/12 py-2 px-3 text-gray-700"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center flex-col">
                    <button
                        className="bg-orange-400 text-white font-bold py-2 px-4 rounded-lg w-full mb-4"
                        type="button"
                        onClick={handleSubmit}>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup