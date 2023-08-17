import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import blogContext from '../context/blogs/blogContext';

const EditBlog = () => {
    const blog_context = useContext(blogContext);
    const { currBlogForEdit, updateBlog, allBlogs } = blog_context;

    const [imageSrc, setImageSrc] = useState(currBlogForEdit.imageSrc);
    const [title, setTitle] = useState(currBlogForEdit.title);
    const [content, setContent] = useState(currBlogForEdit.content);

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/'); // Redirect to the home page or any other desired route
    };

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
            try {
                const updatedBlog = {
                    id: currBlogForEdit.id,
                    userId: currBlogForEdit.userId,
                    imageSrc: imageSrc,
                    title: title,
                    content: content,
                };
                console.log(currBlogForEdit.id ,title, imageSrc, content, currBlogForEdit.index)
                const res = await updateBlog(currBlogForEdit.id, imageSrc, title, content);
                if(res.success){

                    //updating the blog on the frontend, this is to save the code from making additonal call to backend to fetch updated data. 
                    allBlogs[currBlogForEdit.index].title = title
                    allBlogs[currBlogForEdit.index].imageSrc = imageSrc
                    allBlogs[currBlogForEdit.index].content = content 

                    navigate('/');
                }
            } catch (error) {
                alert(error);
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
                <h2 className="text-xl text-center mb-8 font-normal">Edit Blog ✏️</h2>
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
                <div className="flex items-center justify-between">
                    <button
                        className="bg-green-400 text-white font-bold py-2 px-4 rounded w-2/5"
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded w-2/5"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog;
