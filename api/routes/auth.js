const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

const { decodeToken, generateToken } = require('../lib/token')
const { isNewUser, isValidToken } = require('../middleware/auth')
const { validateUser } = require('../middleware/users')

router.get('/profile', isValidToken, async (req, res, next) => {
    try {
        const payload = decodeToken(req.token)

        const user = await User.findOne({_id: payload.id}).select('firstName lastName email assignments admin')
        
        const status = 200
        res.json({status, user})
    } catch (e) {
        console.error(e)
        const message = `You are not authorized to view this route.`
        const error = new Error(message)
        error.status = 401
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    if(user) {
        const valid = await bcrypt.compare(password, user.password)
        if(valid){
            const status = 200
            const response = 'You are logged in'
            const token = generateToken(user._id, user.admin)
            return res.status(status).json({ status, response, token })
        }
    }

    const message = `Username or password incorrect. Please check your credentials and try again.`
    const error = new Error(message)
    error.status = 401
    next(error)
})

router.post('/signup', validateUser, isNewUser, async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body
    const rounds = 10
    const hashed = await bcrypt.hash(password, rounds)

    const status = 201

    const user = await User.create({firstName, lastName, email, password: hashed})

    const token = generateToken(user._id)
    res.status(status).json({ status, token})


})

module.exports = router