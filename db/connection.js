const { MONGO_DB_CONNECTION } = process.env
const mongoose = require('mongoose')

const establishConnection = () => {
    const errorMessage = "No MONGO_DB_CONNECTION string set, check your nodemon.json file."
    try {
        if (!MONGO_DB_CONNECTION) throw { errorMessage }

        const options = {useNewUrlParser: true, useFindAndModify: true}
        mongoose.connect(MONGO_DB_CONNECTION, options)
        console.log(`Connected to database...`)
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = establishConnection