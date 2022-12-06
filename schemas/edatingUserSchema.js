const mongoose = require("mongoose")
const Schema = mongoose.Schema

const edatingUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  secret: {
    type: String,
    required: true
  },

  images: {
    type: Array,
    required: false,
  },


  sex: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: false
  },

})

module.exports = mongoose.model("edatingUser", edatingUserSchema)