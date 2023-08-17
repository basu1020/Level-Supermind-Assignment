import React, { useContext, useEffect, useState } from 'react';
import authContext from '../context/auth/authContext';
import blogContext from '../context/blogs/blogContext';
import BlogItems from './BlogItems';

const ProfilePage = () => {
    const auth_context = useContext(authContext);
    const blog_context = useContext(blogContext);
    const { user, setLoggedIN, getUser } = auth_context;
    const { allBlogs } = blog_context;
    const [userBlogs, setUserBlogs] = useState([])

    const gettingUser = async () => {
        const res = await getUser()
        if (res.success) {
            const userBlogss = allBlogs.filter((elem) => elem.userId === user.id)
            console.log(userBlogss)
            setUserBlogs(userBlogss)
        }
    }
    
    useEffect(() => {
        if(localStorage.getItem("blogApp-token")){
            setLoggedIN(true)
            if(!user.id){
                gettingUser()
            } else {
                setUserBlogs(allBlogs.filter((elem) => elem.userId === user.id))
            }    
        }
    }, [])

    return (
        <div className='flex justify-center items-center h-[92vh] bg-gray-100'>
            <form className='w-3/4 xl:w-2/5 sm:w-4/5 flex flex-col justify-center align-middle bg-white drop-shadow-md rounded-xl px-8 pt-6 pb-8'>
                <h2 className='text-4xl text-center mb-8 font-bold'>Profile</h2>
                <div className='mb-6 flex flex-row justify-between'>
                    <p className='text-xl mx-2'>
                        Name: {user.username}
                    </p>
                    <p className='text-xl mx-2'>
                        Email: {user.email}
                    </p>
                </div>
                <h3 className='text-2xl font-semibold mb-4'>Your Blogs</h3>
                {userBlogs.map((elem, index) => {
                    return <BlogItems props={{...elem, index: index}} key={elem.id}/>
                })}
            </form>
        </div>
    );
};

export default ProfilePage;
