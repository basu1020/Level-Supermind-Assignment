import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import blogContext from '../context/blogs/blogContext'

const BlogItems = ({ props }) => {
    const blog_Context = useContext(blogContext)
    const {setCurrentBlogPage} = blog_Context
    const navigate = useNavigate()

    return (
        <>
            <div className=" drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-lg h-[22vh] w-auto flex flex-row my-3">
                <div className="w-1/2 flex items-center align-middle mx-2">
                    <img src={props.imageSrc} alt="" className='cursor-pointer h-full w-[300px] object-cover'/>
                </div>
                <div className="flex flex-col items-start justify-between py-3 mx-2">
                    <p className="text-4xl text-black cursor-pointer hover:text-blue-500 items-start flex flex-row justify-start" onClick={() => {
                        setCurrentBlogPage(props)
                        navigate("/blog-page")
                    }}>
                        {props.title}
                    </p>
                    <p className="text-md text-black cursor-pointer hover:text-blue-500 ">
                        {`${props.content.substring(0,200)}...`}
                    </p>
                    <p className="text-gray-700">
                        created by {props.createdBy}
                    </p>
                </div>
            </div>
        </>
    )
}

export default BlogItems