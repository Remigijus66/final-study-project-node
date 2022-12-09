const bcrypt = require("bcrypt");
const { uid } = require('uid');
const session = require("express-session");


const edatingUserSchema = require("../schemas/edatingUserSchema");
const edatingLikesSchema = require("../schemas/edatingLikesSchema");



module.exports = {


    register: async (req, res) => {
        const { name, passOne, sex, age, city } = req.body
        const hash = await bcrypt.hash(passOne, 10)
        const secret = uid(30)
        const user = new edatingUserSchema({ name, pass: hash, secret, sex, age, city })
        await user.save()
        res.send({ error: false, message: 'user registered', data: user })
    },



    login: async (req, res) => {
        const { name, pass, autologin } = req.body
        console.log('name ===', name);
        console.log('pass ===', pass);
        console.log('autologin ===', autologin);

        const user = await edatingUserSchema.findOne({ name })
        if (autologin === true) {
            console.log('then version')
        } else {
            console.log('else version')
        }
        if (!user) return res.send({ error: true, message: "user not found", data: null })
        const correctPassword = await bcrypt.compare(pass, user.pass);
        if (!correctPassword) return res.send({ error: true, message: "incorrect password", data: null })
        // // console.log('correctPassword ===', correctPassword);
        req.session.name = name;
        res.send({ error: false, message: 'session established', data: user })

    },

    autologin: async (req, res) => {
        const { secret } = req.body
        const user = await edatingUserSchema.findOne({ secret })
        if (!user) return res.send({ error: true, message: "please login again", data: null })
        req.session.name = user.name;
        res.send({ error: false, message: 'session established', data: user })
    },

    logout: (req, res) => {

        console.log(req)
        req.session.destroy()
        console.log('session terminated')
        res.send({ message: 'session terminated' })

    },
    updateprofile: async (req, res) => {
        const { image } = req.body
        const name = req.session.name
        if (!name) return res.send({ error: true, message: 'you are not logged in', data: null })

        const user = await edatingUserSchema.findOneAndUpdate({ name }, { $push: { images: image } }, { returnDocument: "after" })
        console.log('updated')
        res.send({ error: false, message: 'data updated', data: user })

    },

    addLike: async (req, res) => {
        const { author, liked } = req.body
        const name = req.session.name
        if (!name) return res.send({ error: true, message: 'you are not logged in', data: null })
        const like = new edatingLikesSchema({ author, liked })
        await like.save()
        res.send({ error: false, message: 'like added', data: null })
    },


    getList: async (req, res) => {
        const { sex, city, minAge, maxAge, name } = req.body
        const sesionName = req.session.name
        if (!sesionName) return res.send({ error: true, message: 'you are not logged in', data: null })
        console.log('name', name);

        const users = await edatingUserSchema.aggregate(
            [
                {
                    '$match': {
                        name: { $ne: name }, sex: sex, city: city, age: { $gte: minAge * 1, $lte: maxAge * 1 }
                    }
                }, {
                    '$lookup': {
                        'from': 'edatinglikes',
                        'let': {
                            'user_name': '$name'
                        },
                        'pipeline': [
                            {
                                '$match': {
                                    '$expr': {
                                        '$and': [
                                            {
                                                '$eq': [
                                                    name, '$author'
                                                ]
                                            }, {
                                                '$eq': [
                                                    '$$user_name', '$liked'
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        'as': 'collectedlikes'
                    }
                }, {
                    '$match': {
                        'collectedlikes': {
                            '$exists': true,
                            '$size': 0
                        }
                    }
                }
            ]
        )
        // console.log('users', users)
        res.send({ error: false, message: 'selectedUsers', data: users })
    },

    likedMe: async (req, res) => {
        const { name } = req.body
        const sesionName = req.session.name
        if (!sesionName) return res.send({ error: true, message: 'you are not logged in', data: null })
        console.log('likedMe name=', name)
        const users = await edatingLikesSchema.aggregate(
            [
                {
                    '$match': {
                        'liked': name
                    }
                }, {
                    '$lookup': {
                        'from': 'edatingusers',
                        'localField': 'author',
                        'foreignField': 'name',
                        'as': 'person'
                    }
                }
            ]
        )
        console.log(users)
        res.send({ error: false, message: 'likedMe', data: users })
    },

    iLiked: async (req, res) => {
        const { name } = req.body
        const sesionName = req.session.name
        if (!sesionName) return res.send({ error: true, message: 'you are not logged in', data: null })
        const users = await edatingLikesSchema.aggregate(
            [
                {
                    '$match': {
                        'author': name
                    }
                }, {
                    '$lookup': {
                        'from': 'edatingusers',
                        'localField': 'liked',
                        'foreignField': 'name',
                        'as': 'person'
                    }
                }
            ]
        )
        console.log(users)
        res.send({ error: false, message: 'iLiked', data: users })
    }

}
