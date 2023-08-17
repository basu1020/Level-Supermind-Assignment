import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AuthState from './context/auth/authState'
import BlogState from './context/blogs/blogState';
import BlogsPage from './components/BlogsPage';
import blogContext from './context/blogs/blogContext';
import { useContext } from 'react';
import CreateBlog from './components/CreateBlog';
import EditBlog from './components/EditBlog';
import ProfilePage from './components/ProfilePage';

function App() {

  return (
    <>
    <BlogState>
      <AuthState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/blog-page' element={<BlogsPage />}/>
            <Route exact path='/create-blog' element={<CreateBlog />}/>
            <Route exact path='/edit-blog' element={<EditBlog/>}/>
            <Route exact path='/profile' element={<ProfilePage/>}/>
          </Routes>
        </BrowserRouter>
      </AuthState>
    </BlogState>
    </>
  )
}

export default App
