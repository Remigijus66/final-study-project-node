const express = require("express")
const router = express.Router()
const { validateRegistration, validateUpdate } = require("../middleware/validator")

const {
    register,
    login,
    autologin,
    logout,
    updateprofile,
    deletePhoto,
    addLike,
    likedMe,
    iLiked,
    getList,
    sendMessage,
    getMessages

} = require("../controllers/mainController")

router.post('/register', validateRegistration, register)
router.post('/login', login)
router.post('/autologin', autologin)
router.post('/logout', logout)
router.post('/updateprofile', validateUpdate, updateprofile)
router.post('/deletePhoto', deletePhoto)
router.post('/addLike', addLike)
router.post('/likedMe', likedMe)
router.post('/iLiked', iLiked)
router.post('/getList', getList)
router.post('/sendMessage', sendMessage)
router.post('/getMessages', getMessages)



module.exports = router
