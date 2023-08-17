import React, { useState, useContext, useEffect } from 'react'
import authContext from '../context/auth/authContext'
import { useNavigate } from 'react-router-dom'
import blogContext from '../context/blogs/blogContext'
import BlogItems from './BlogItems'

const Home = () => {
    const auth_context = useContext(authContext)
    const blog_context = useContext(blogContext)
    const { loggedIN, setLoggedIN, getUser, user } = auth_context
    const { allBlogs, fetchAllBlogs } = blog_context
    const navigate = useNavigate()

    const gettingUser = async () => {
        await getUser()
    }

    useEffect(() => {
        if (localStorage.getItem("blogApp-token")) {
            setLoggedIN(true)
            if (!user.id) {
                gettingUser()
            }
        }
        else{
            setLoggedIN(false)
        }

        if(allBlogs.length === 0) {
            fetchAllBlogs()
        }

        return () => {}
    }, [])

    return (
        <div className="flex flex-col items-center align-middle justify-center">
            <div className='flex flex-row font-bold text-4xl justify-between items-center align-middle h-[30vh] w-[80vw]'>
                <p> Blogs 👨‍💻</p>
                {!loggedIN && <div></div>}
                {loggedIN && <button className="bg-orange-400 text-white text-sm font-bold py-2 px-4 rounded mb-4" onClick={() => {
                    navigate("/create-blog")
                }}>Create New Blog</button>}
            </div>
            <div className="flex flex-col w-[80vw] p-2">
            {allBlogs.map((elem, index) => {
                return <BlogItems props={{...elem, index: index}} key={elem.id}/>
            })}
            </div>
        </div>
    )
}

export default Home