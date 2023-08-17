import AuthContext from "./authContext";
import { useState } from "react";

const AuthState = (props) => {
    const host = 'http://ec2-3-92-59-59.compute-1.amazonaws.com:5000'
    const [loggedIN, setLoggedIN] = useState(false)
    const [user, setUser] = useState({})

    const login = async (email, password) => {

        const response = await fetch(`${host}/user/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": password})
        })
        const json = await response.json()
        return json
    }

    const signup = async (name, email, password) => {
        const response = await fetch(`${host}/user/signup`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({"name": name, "email":email, "password": password})
        })
        const json = await response.json()
        return json
    }

    const getUser = async () => {
        const response = await fetch(`${host}/user/get-user`, {
            method:'POST',
            headers: {
                'Content-type':'application/json',
                'auth-token': localStorage.getItem("blogApp-token")
            }
        })
        const json = await response.json()
        setUser(json.user)
        return json.success
    }

    return (
        <AuthContext.Provider value={{login, signup, loggedIN, setLoggedIN, user, setUser, getUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState