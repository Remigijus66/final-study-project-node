const edatingUserSchema = require("../schemas/edatingUserSchema")

module.exports = {
    validateRegistration: async (req, res, next) => {
        const { name, passOne, passTwo, sex, age, city } = req.body
        const userExists = await edatingUserSchema.findOne({ name })
        if (userExists) return res.send({ error: true, message: "This name is allready in use", data: 'badName' })
        if (name.trim().length < 1) return res.send({ error: true, message: "Name is required", data: 'badName' })
        if (passOne !== passTwo) return res.send({ error: true, message: "Passwords do not match", data: 'badPass' })
        if (passOne.trim().length < 4 || passOne.trim().length > 20 || !/\d/.test(passOne.trim())) return res.send({ error: true, message: "Password should be 4 - 20 characters long and contain at least one number", data: 'badPass' })
        if (sex.trim().length < 1) return res.send({ error: true, message: "Gender is required", data: 'badSex' })
        if (age < 18 || age > 100) return res.send({ error: true, message: "Age is required", data: 'badAge' })
        if (city === 'City') return res.send({ error: true, message: "City is required", data: 'badCity' })
        next()
    },
    validateUpdate: (req, res, next) => {
        const { image, } = req.body;
        if (image.trim().length < 1) return res.send({ error: true, message: "No image found", data: null })
        next()
    },


}

