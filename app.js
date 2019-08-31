const { NODE_ENV, PORT } = process.env
const express = require('express')
const app = express()

app.use(require('cors')({
    origin: 'https://final-project-frontend.timkillis.now.sh',
    optionsSuccessStatus: 200
}))

require('./db/connection')()

if (NODE_ENV === 'DEV') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.use(require('./api/middleware/set-token'))

app.use('/api', require('./api/routes/auth'))
app.use('/api/users', require('./api/routes/users'))
app.use('/api/users/:userId/assignments', require('./api/routes/assignments'))

app.use((req, res, next) => {
  const error = new Error(`Could not ${req.method} ${req.path}`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  if (NODE_ENV === 'development') console.error(err)
  const { message, status } = err
  res.status(status).json({ status, message })
})

const listener = () => console.log(`Listening on Port ${PORT}!`)
app.listen(PORT, listener)
