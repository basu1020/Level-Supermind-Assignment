const express = require('express')
const app = express()

const cors = require('cors')
const { signupValidator, signup, loginValidators, login, getUser } = require('./controllers/authControllers')
const fetchuser = require('./middleware/fetchUser')
const { newBlogCreator, blogIdValidator, blogUpdater, newBlogValidator, blogUserIdValidator, getBlogsofUser, blogDeleter, fetchAllBlogs } = require('./controllers/blogControllers')

const sequelize = require('./models/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = 5000

app.post('/user/signup', signupValidator, signup)

app.post('/user/login', loginValidators, login)

app.post('/user/get-user', fetchuser, getUser)

app.post('/blogs/new', fetchuser, newBlogValidator, newBlogCreator)

app.post('/blogs/update', fetchuser, blogIdValidator, blogUpdater)

app.post('/blogs/get-blogs/user', blogUserIdValidator, getBlogsofUser)

app.delete('/blogs/delete', fetchuser, blogIdValidator, blogDeleter)

app.get('/blogs/get-all', fetchAllBlogs)

sequelize.sync()
    .then(() => {
        console.log("Synced db.")
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message)
    })

app.listen(port, () => {
    console.log(`live on ${port}`)
})

