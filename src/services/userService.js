const { User } = require('../models/userModel');
const crypt = require('bcrypt');
const uuid = require('react-uuid');

verifyUser = async (user, onError, onSuccess) => {
    User.findOne( {username: user.username}, (err, doc) => {
        if (err) 
            throw err;
        else if (doc == null) 
            onError("User doesn't exists");
        else {
            let passwordHash = doc.password;

            crypt.compare(user.password, passwordHash, (err, doesMatch) => {
                if (err) 
                    throw err;
                else if (doesMatch) 
                    onSuccess();
                 else 
                    onError("Wrong username or password");
            })
        }
    })
}

save = async (user, onError, onSuccess) => {
    User.findOne( {username: user.username}, (err, doc) => {
        if (err)    
            throw err;
        else if (doc)   
            onError("User is already registered");
        else {
            let document = new User({
                username: user.username,
                password: user.password,
                uuid: uuid()
            });
            
            crypt.hash(user.password, 10, (err, hash) => {
                if (err) throw err
                document.password = hash;
                document.save();
                onSuccess();
            });
        }   
    });
}


exports.save = save
exports.verifyUser = verifyUser