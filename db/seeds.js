const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

const reset = async () => {
    mongoose.connect(config.env.MONGO_DB_CONNECTION, {useNewUrlParser: true})
    await User.deleteMany()
    const admin = await User.create([
        {
            firstName:'The',
            lastName:'Professor',
            password: bcrypt.hashSync('password', 10),
            email:'admin@email.com',
            admin: true
        }
    ])

    const students = await User.create([
        {
            firstName:'Tim',
            lastName:'Willis',
            password: bcrypt.hashSync('password', 10),
            email: 'timwillis@email.com',
            assignments: [
                {
                    title: 'CSS Grid project',
                    link: 'https://github.com/timwillis/project',
                    description: 'This is a project I did',
                    score: 90,
                    maxScore: 100
                },
                {
                    title: 'CSS Flexbox project',
                    link: 'https://github.com/timwillis/project2',
                    description: 'This is another project I did',
                    score: 50,
                    maxScore: 75
                },
                {
                    title: 'CSS Animation project',
                    link: 'https://github.com/timwillis/project3',
                    description: 'This is a third project I did'
                }
            ]
        },
        {
            firstName: 'Wim',
            lastName: 'Tillis',
            password: bcrypt.hashSync('password', 10),
            email: 'wimtillis@gmail.com',
            assignments: [
                {
                    title: 'CSS Flexbox Project',
                    link: 'http://github.com/wimtillis/projectflexbox',
                    description: `This is a project I did`
                }
            ]
        },
        {
            firstName: 'John',
            lastName: 'Smith',
            password: bcrypt.hashSync('password', 10),
            email: 'student@email.com',
            assignments:[
                {
                    title: `John Smith's Project`,
                    link: 'https://github.com/johnsmith/project',
                    description: `This is a project I did`
                }
            ]
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            password: bcrypt.hashSync('password', 10),
            email: 'jane@email.com',
            assignments:[
                {
                    title: `Jane Smith's Project`,
                    link: 'https://github.com/janesmith/project',
                    description: `This is a project I did`
                }
            ]
        },
        {
            firstName: 'Stephanie',
            lastName: 'Nicole',
            password: bcrypt.hashSync('password', 10),
            email: 'stephanie@email.com',
            assignments:[
                {
                    title: `Stephanie's Ultracool Project`,
                    link: 'https://github.com/stephanie/project',
                    description: `The coolest project of them all!`,
                    score: 1,
                    maxScore: 3
                }
            ]
        },
        {
            firstName: 'Maxwell',
            lastName: 'Christian',
            password: bcrypt.hashSync('password', 10),
            email: 'maxwell@email.com',
            assignments:[
                {
                    title: `Max's Project`,
                    link: 'https://github.com/maxwellchristian/project',
                    description: `Really stoked on this one!`
                }
            ]
        },
        {
            firstName: 'Sarah',
            lastName: 'Ann',
            password: bcrypt.hashSync('password', 10),
            email: 'sarah@email.com',
            assignments:[
                {
                    title: `Sarah's Project`,
                    link: 'https://github.com/sarahann/project',
                    description: `Had a really fun time with this assignemnt`
                }
            ]
        },
        {
            firstName: 'Raymond',
            lastName: 'Walter',
            password: bcrypt.hashSync('password', 10),
            email: 'raymond@email.com',
            assignments:[
                {
                    title: `Raymond's Project`,
                    link: 'https://github.com/raywalter/project',
                    description: `Had a really fun time with this assignemnt`
                }
            ]
        },
        {
            firstName: 'Baby',
            lastName: 'Cat',
            password: bcrypt.hashSync('password', 10),
            email: 'babycat@email.com',
            assignments:[
                {
                    title: `Baby the cat's Project`,
                    link: 'https://github.com/babycat/project',
                    description: `I am a cat but I can still do homework and assignments`
                }
            ]
        },
        {
            firstName: 'Arlo',
            lastName: 'Dog',
            password: bcrypt.hashSync('password', 10),
            email: 'arlodog@email.com',
            assignments:[
                {
                    title: `Arlo the dog's Project`,
                    link: 'https://github.com/arlodog/project',
                    description: `I am a dog but I can still do homework and assignments`
                }
            ]
        },
    ])

    return {admin, students}
}

reset().catch(console.error).then((response) => {
    console.log(`Seeds successful! ${response.admin.length} admin created, ${response.students.length} students created.`)
    return mongoose.disconnect()
})
  