const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (next) {
  const user = this

  const hash = await bcrypt.hash(user.password, 12)
  user.password = hash
})

userSchema.methods.comparePassword = async function (candidatePassword, callback) {
  const user = this

  try {
    const isMatch = await bcrypt.compare(candidatePassword, user.password)
    callback(null, isMatch)
  } catch (e) {
    callback(e)
  }
}

const User = mongoose.model('user', userSchema)

module.exports = User
