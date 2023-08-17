const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/userModel')
const { body, validationResult } = require('express-validator')

const generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET)
    return token
}

const signupValidator = [
    body('name').isLength({ min: 6 }).withMessage('Name must be at least 6 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // findOne email
        const user = await User.findOne({ where: { email: req.body.email } })

        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const securePass = await bcrypt.hash(req.body.password, salt)
        req.body.password = securePass

        // creating new user 
        const newUser = await User.create({ username: req.body.name, email: req.body.email, password: req.body.password })
        res.status(201).json({ success: true, newUser })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const loginValidators = [
    body('email').isEmail(),
    body('password').exists()
]

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // check if the user with the given email exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found with this email' });
        }

        // compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials, pleae check your password' });
        }

        // generate and return an authentication token
        const authToken = generateAuthToken(user);
        res.status(200).json({ success: true, authToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // return the user details
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    signupValidator, signup, loginValidators, login, getUser
}

