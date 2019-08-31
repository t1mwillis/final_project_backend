const router = require('express').Router({mergeParams: true}) //include userId
const User = require('../models/user')
const { isLoggedIn, isSameUser, isAdmin } = require('../middleware/auth')
const { validateAssignment, noScoringData, onlyScoringData } = require('../middleware/assignments')

router.all('*', isLoggedIn)

router.post('/', isSameUser, validateAssignment, noScoringData, async (req, res, next) => {
    const status = 201

    const user = await User.findById(req.params.userId)
    user.assignments.push(req.body)
    await user.save()

    const response = user.assignments[user.assignments.length - 1]
    res.status(201).json({status, response})
})

router.put('/:assignmentId', isSameUser, noScoringData, validateAssignment, async (req, res, next) => {
    const status = 200

    const { assignmentId, userId } = req.params
    const query = { _id:userId }
    const user = await User.findOne(query)
    const assignment = user.assignments.id(assignmentId)

    //tricky but I think this will work.

    Object.assign(assignment, req.body)

    await user.save()

    res.status(status).json({status, response: assignment})
})

router.put('/:assignmentId/score', isAdmin, onlyScoringData, async (req, res, next) => {
    const status = 200

    const { assignmentId, userId } = req.params
    const query = { _id:userId }
    const user = await User.findOne(query)
    const assignment = user.assignments.id(assignmentId)

    Object.assign(assignment, req.body)

    await user.save()

    res.status(status).json({status, response: assignment})
})

router.delete('/:assignmentId', isSameUser, async (req, res, next) => {
    const status = 200

    const { assignmentId, userId } = req.params
    const query = { _id:userId }
    const user = await User.findOne(query)

    user.assignments = user.assignments.filter(assignment => assignment.id !== assignmentId)
    await user.save()
    
    res.status(status).json({status, response: user})
})

module.exports = router