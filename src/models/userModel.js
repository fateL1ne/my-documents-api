const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect(process.env.DATABASE_URL, (err) => {
    if (err) throw err;
});

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
      unique: true
    },
    uuid: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 256
    }
  });

validate = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(25).required(),
        password: Joi.string().min(8).max(40).required()
    });

    return schema.validate(user);
}

const User = mongoose.model('Users', UserSchema);

exports.User = User
exports.validate = validate
