import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import appContext from '../context/auth/authContext';
import blogContext from '../context/blogs/blogContext';
// import { fetchAllBlogs } from '../context/blogs/blogState';

const CreateBlog = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    const blog_context = useContext(blogContext);
    const { createNewBlog, fetchAllBlogs, allBlogs, userBlogs } = blog_context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.classList.add('animate-bounce');

        if (
            imageSrc.length > 0 &&
            imageSrc.length <= 100 &&
            title.length > 10 &&
            title.length <= 100 &&
            content.length > 10 &&
            content.length <= 1000
        ) {
            try{
                const newBlog = await createNewBlog(imageSrc, title, content)
                if (newBlog.success) {
                    // await fetchAllBlogs()
                    allBlogs.push(newBlog.newBlog)
                    if(userBlogs){
                        userBlogs.push(newBlog.newBlog)
                    }
                    navigate('/');
                }
            }
            catch(error) {
                alert(error)
            }
        } else {
            alert(
                'Please provide valid inputs. Image src (1-100), Title (10-100), Content (10-1000).'
            );
        }
        e.target.classList.remove('animate-bounce');
    };

    return (
        <div className="flex justify-center items-center h-[92vh] bg-gray-100">
            <form className="w-3/4 xl:w-2/5 sm:w-4/5 flex flex-col justify-center align-middle bg-white drop-shadow-md rounded-xl px-8 pt-6 pb-8">
                <h2 className="text-xl text-center mb-8 font-normal">Create a Blog 📝</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageSrc">
                        Image src (1-100 characters)
                    </label>
                    <input
                        className="my-font drop-shadow hover:drop-shadow-md rounded-lg w-11/12 py-2 px-3 text-gray-700"
                        id="imageSrc"
                        type="text"
                        placeholder="Image Source"
                        value={imageSrc}
                        onChange={(e) => setImageSrc(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title (10-100 characters)
                    </label>
                    <input
                        className="my-font drop-shadow hover:drop-shadow-md rounded-lg w-11/12 py-2 px-3 text-gray-700"
                        id="title"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content (10-1000 characters)
                    </label>
                    <textarea
                        className="my-font drop-shadow hover:drop-shadow-md rounded-lg w-11/12 py-2 px-3 text-gray-700"
                        id="content"
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-green-400 text-white font-bold py-2 px-4 rounded w-full"
                        onClick={handleSubmit}
                    >
                        Create Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
