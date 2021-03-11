const { User } = require('../models/userModel');

let response = (status, body) => {
    return {
        status: status,
        body: body
    } 
}


save = async (user) => {
    let document = await User.findOne( {username: user.username} );

    if (document) {
        return response(400, "User is already registered")
    }

    document = new User({
        username: user.username,
        password: user.password
    });

    await document.save();

    return response(200, "Sucessfully registered.")
}


exports.save = save