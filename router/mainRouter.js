const express = require("express")
const router = express.Router()
const { validateRegistration, validateUpdate, validateDiscussion, validateComment, validateAuction } = require("../middleware/validator")

const {
    register,
    login,
    autologin,
    logout,
    updateprofile,
    // createDiscussion,
    // addMessageCounter,
    // getDiscussions,
    // createComment,
    // getComments,
    // getUsers,

} = require("../controllers/mainController")

router.post('/register', validateRegistration, register)
router.post('/login', login)
router.post('/autologin', autologin)
router.post('/logout', logout)
router.post('/updateprofile', validateUpdate, updateprofile)
// router.post('/createDiscussion', validateDiscussion, createDiscussion)
// router.post('/addMessageCounter', addMessageCounter)
// router.post('/getDiscussions', getDiscussions)
// router.post('/createComment', validateComment, createComment)
// router.post('/getComments', getComments)
// router.post('/getUsers', getUsers)



module.exports = router
