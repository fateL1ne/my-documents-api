const { User } = require('../models/userModel');
const crypt = require('bcrypt');

verifyUser = async (user, onError, onSuccess) => {
    User.findOne( {username: user.username}, (err, doc) => {
        if (err) 
            throw err;
        else if (doc == null) 
            onError("Wrong username or password");
        else {
            crypt.compare(user.password, doc.password, (err, doesMatch) => {
                if (err) 
                    throw err;
                else if (doesMatch) 
                    onSuccess(doc);
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
                password: user.password
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