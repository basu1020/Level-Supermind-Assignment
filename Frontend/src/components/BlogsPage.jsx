import React from 'react';
import blogContext from '../context/blogs/blogContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import authContext from '../context/auth/authContext';

const BlogsPage = () => {
    const auth_context = useContext(authContext);
    const blog_context = useContext(blogContext);
    const { currentBlogPage,allBlogs, setAllBlogs, setCurrBlogForEdit, deleteBlog } = blog_context;
    const { user } = auth_context
    const navigate = useNavigate()

    const handleEditClick = () => {
        setCurrBlogForEdit(currentBlogPage)
        navigate("/edit-blog")
    }

    const handleDeleteClick = async () => {
        if(window.confirm('Are you sure you want to delete this blog? ')){
            const res = await deleteBlog(currentBlogPage.id)
            if(res) {
                const newAllBlogs = allBlogs.filter(elem => elem.id !== currentBlogPage.id)
                setAllBlogs(newAllBlogs)
                navigate("/")
            }
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-10/12'>
                <div className='m-8 flex justify-center items-center'>
                    <img
                        src={currentBlogPage.imageSrc}
                        alt=''
                        className='w-[50vw] h-auto object-cover rounded-lg'
                    />
                </div>
                <div className='text-center mb-8 flex justify-center items-center w-full'>
                    <p className='text-4xl font-bold text-black mr-2'>
                        {currentBlogPage.title}
                    </p>
                    {user.id === currentBlogPage.userId ? <FaEdit className='text-blue-500 text-xl cursor-pointer ms-4' onClick={handleEditClick}/>: ''}
                    
                    {user.id === currentBlogPage.userId ? <FaTrash className='text-red-500 text-xl cursor-pointer ms-4' onClick={handleDeleteClick} />: ''}
                </div>
                <p className='text-gray-500 text-center mb-8'>
                    Created by {currentBlogPage.createdBy}
                </p>
                <div className='prose max-w-none'>
                    <p className='text-gray-700 mb-8'>{currentBlogPage.content}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogsPage;
