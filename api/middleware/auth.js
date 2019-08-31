const User = require('../models/user')
const { decodeToken } = require('../lib/token')

const isValidToken = async (req, _res, next) => {
    const payload = decodeToken(req.token)
    const user = await User.findOne({_id: payload.id})
    
    if (user) return next()

    const message = `You are not authorized to access this route, please login and try again`
    const error = new Error(message)
    error.status = 401
    next(error)
}

const isNewUser = async (req, _res, next) => {
    const { email } = req.body
    const alreadyExists = await User.findOne({ email })

    if(!alreadyExists) return next()
    
    const message = `${email} already exists`
    const error = new Error(message)
    error.status = 400
    return next(error)
}

const isLoggedIn = (req, _res, next) => {
    if (!req.token) {
        const message = `You are not logged in`
        const error = new Error(message)
        error.status = 401
        return next(error)
    }

    try{
        decodeToken(req.token)
        next()
    } catch (e) {
        console.error(e)
        const message = `There is a problem with your credentials`
        const error = new Error(message)
        error.status = 401
        next(error)
    }
}

const isSameUser = (req, _res, next) => {
    const id = req.params.userId
    const payload = decodeToken(req.token)

    if (payload.id === id) return next()

    const message = `You are not allowed to access this route.`
    const error = new Error(message)
    error.status = 401
    next(error)
}

const isAdmin = async (req, _res, next) => {
    const { id }  = decodeToken(req.token)
    const user = await User.findById(id)
    if (user.admin) return next()

    const message = `You are not allowed to access this route.`
    const error = new Error(message)
    error.status = 401
    next(error)
    
}
module.exports = { isValidToken, isNewUser, isLoggedIn, isSameUser, isAdmin}