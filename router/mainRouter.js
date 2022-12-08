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
    addLike,
    likedMe,
    iLiked,
    // getComments,
    getList,

} = require("../controllers/mainController")

router.post('/register', validateRegistration, register)
router.post('/login', login)
router.post('/autologin', autologin)
router.post('/logout', logout)
router.post('/updateprofile', validateUpdate, updateprofile)
// router.post('/createDiscussion', validateDiscussion, createDiscussion)
router.post('/addLike', addLike)
router.post('/likedMe', likedMe)
router.post('/iLiked', iLiked)
// router.post('/getComments', getComments)
router.post('/getList', getList)



module.exports = router
