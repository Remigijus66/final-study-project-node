const bcrypt = require("bcrypt");
const { uid } = require('uid');
const session = require("express-session");
// const auctionSchema = require("../schemas/auctionSchema");
// const forumCommentsSchema = require("../schemas/forumCommentsSchema");
// const forumDiscussionSchema = require("../schemas/forumDiscussionSchema");

const edatingUserSchema = require("../schemas/edatingUserSchema");



module.exports = {


    register: async (req, res) => {
        const { name, passOne, sex, age, city } = req.body
        const hash = await bcrypt.hash(passOne, 10)
        const secret = uid(30)
        const user = new edatingUserSchema({ name, pass: hash, secret, sex, age, city })
        await user.save()
        // req.session.name = name;
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
    // createDiscussion: async (req, res) => {
    //     const { author, topic, title, description, date } = req.body
    //     const name = req.session.name
    //     if (!name) return res.send({ error: true, message: 'you are not logged in', data: null })
    //     const discussion = new forumDiscussionSchema({ author, topic, title, description, date })
    //     console.log(discussion)
    //     await discussion.save()
    //     console.log('new discusssion saved')
    //     res.send({ error: false, message: 'new discusssion saved', data: discussion })

    // },
    // addMessageCounter: async (req, res) => {
    //     const { name } = req.body
    //     console.log('message counter', req.body)
    //     const user = await forumUserSchema.findOneAndUpdate({ name }, { $inc: { messages: 1 } }, { returnDocument: "after" })
    //     res.send({ error: false, message: 'message counter added', data: user })
    // },
    // getDiscussions: async (req, res) => {
    //     const { topic } = req.body
    //     const discussions = await forumDiscussionSchema.find({ topic: topic })
    //     res.send({ error: false, message: 'discussions', data: discussions })
    // },
    // createComment: async (req, res) => {
    //     const { author, discussion, inReply, text, photo, video, time, originalComment } = req.body
    //     const comment = new forumCommentsSchema({ author, discussion, inReply, text, photo, video, time, originalComment })
    //     await comment.save()
    //     res.send({ error: false, message: 'comment added', data: comment })
    //     console.log(req.body)
    // },
    // getComments: async (req, res) => {
    //     const { discussion, commentsIndex } = req.body
    //     // find().skip(20).limit(10)
    //     const comments = await forumCommentsSchema.find({ discussion: discussion }).skip(commentsIndex - 1).limit(5)

    //     console.log('comments=> ', comments)
    //     res.send({ error: false, message: 'comments', data: comments })
    // },

    // getUsers: async (req, res) => {
    //     const users = await forumUserSchema.find()
    //     res.send({ error: false, message: 'comments', data: users })
    // },


}
