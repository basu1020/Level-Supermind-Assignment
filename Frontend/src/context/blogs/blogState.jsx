import BlogContext from "./blogContext";
import {useState} from "react";

const BlogState = (props) => {
    const host = 'http://ec2-3-92-59-59.compute-1.amazonaws.com:5000'
    const [allBlogs, setAllBlogs] = useState([])
    const [userBlogs, setUserBlogs] = useState([])
    const [currentBlogPage, setCurrentBlogPage] = useState(null)
    const [currBlogForEdit, setCurrBlogForEdit] = useState(null)

    const fetchAllBlogs = async () => {
        const response = await fetch(`${host}/blogs/get-all`)

        const json = await response.json()
        setAllBlogs(json.allBlogs)
    }

    const fetchUserBlogs = async (userId) => {
        const response = await fetch(`${host}/blogs/get-blogs/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId})
        })

        const json = await response.json()
        setUserBlogs(json.blogsByUser)
        return json.success
    }

    const deleteBlog = async (blogId) => {
        const response = await fetch(`${host}/blogs/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("blogApp-token")
            },
            body: JSON.stringify({blogId})
        })

        if (response.status === 204){
            return true
        }
        return false
    }

    const createNewBlog = async (imageSrc, title, content) => {
        const response = await fetch(`${host}/blogs/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("blogApp-token")
            },
            body: JSON.stringify({imageSrc, title, content})
        })

        const json = await response.json()
        return json
    }

    const updateBlog = async (blogId, imageSrc, title, content) => {
        const response = await fetch(`${host}/blogs/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("blogApp-token")
            },
            body: JSON.stringify({blogId, imageSrc, title, content})
        })

        const json = await response.json()
        return json
    }

    return (
        <BlogContext.Provider value={{allBlogs, setAllBlogs, userBlogs, setUserBlogs, updateBlog, createNewBlog,deleteBlog,fetchAllBlogs, fetchUserBlogs, currentBlogPage, setCurrentBlogPage, currBlogForEdit, setCurrBlogForEdit}}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState



