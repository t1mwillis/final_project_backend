const router = require('express').Router()
const User = require('../models/user')
const { isValidToken, isLoggedIn, isSameUser, isAdmin } = require('../middleware/auth')
const { removeAdmins } = require('../middleware/users')

const userKeys = 'firstName lastName email score'
const adminKeys = '-__v -password -admin'

router.all('*', isValidToken, isLoggedIn)

//how do we filter out the admins from the users?

router.get('/', removeAdmins, async (req, res, next) => {
    const status = 200
    const response = await User.find(req.query).select(userKeys)
    res.json({ status, response })
})

router.get('/admin', isAdmin, removeAdmins, async (req, res, next) => {
    const status = 200
    const response = await User.find(req.query).select(adminKeys)
    res.json({ status, response })
})

router.get('/:userId', isSameUser, async( req, res, next) => {
    const status = 200
    const response = await User.findById(req.params.userId)
    res.json({ status, response })
})


module.exports = router
