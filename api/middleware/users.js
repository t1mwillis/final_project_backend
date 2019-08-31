const User = require('../models/user')

const validateUser = async (req, _res, next) => {
  try {
    const user = new User(req.body)
    await user.validate()
    next()
  } catch (e) {
    Object.keys(e.errors).forEach((key) =>{
      console.log(key)
    })
    e.status = 422
    return next(e)
  }
}

const removeAdmins = async (req, _res, next) => {
  req.query.admin = false
  next()
}

module.exports = { validateUser, removeAdmins }
