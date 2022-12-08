const mongoose = require("mongoose")
const Schema = mongoose.Schema

const edatingLikesSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  liked: {
    type: String,
    required: true
  },
  // disliked: {
  //   type: String,
  //   required: false
  // },

})

module.exports = mongoose.model("edatingLikes", edatingLikesSchema)