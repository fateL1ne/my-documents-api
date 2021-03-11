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
      maxlength: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 255
    }
  });

validate = (user) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    return schema.validate(user);
}

const User = mongoose.model('Users', UserSchema);

exports.User = User
exports.validate = validate
