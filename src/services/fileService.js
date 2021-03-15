const { FileModel } = require('../models/fileModel');


save = async (file, onError, onSuccess) => {
    new FileModel(file).save( (err) => {
        if 
            (err) onError(err);
        else
            onSuccess();
    })
}

module.exports.saveFile = save
