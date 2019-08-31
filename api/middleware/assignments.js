const Assignment = require('../models/assignment')
const User = require('../models/user')

const validateAssignment = async (req, _res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    user.assignments.push(req.body)
    await user.validate()
    next()
  } catch (e) {
    e.status = 422
    return next(e)
  }
}

const onlyScoringData = async (req, _res, next) => {
  const { score, maxScore } = req.body

  req.body = {score, maxScore}
  next()
}

const noScoringData = async (req, _res, next) => {
  const { score, maxScore } = req.body

  if (!score && !maxScore) return next()

  const message = `You cannot score your own assignments!`
  const error = new Error(message)
  error.status = 422
  return next(error)
}

module.exports = { validateAssignment, noScoringData, onlyScoringData }