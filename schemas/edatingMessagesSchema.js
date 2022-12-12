const mongoose = require("mongoose")
const Schema = mongoose.Schema

const edatingMessagesSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  }


})

module.exports = mongoose.model("edatingMessages", edatingMessagesSchema)