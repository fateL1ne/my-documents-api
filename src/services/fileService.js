const { FileModel } = require('../models/fileModel');


save = async (file, onError, onSuccess) => {
    new FileModel(file).save( (err) => {
        if 
            (err) onError(err);
        else
            onSuccess();
    })
}

findAll = async (uuid, dataHandler) => {
    FileModel.find( {owner: uuid}, (err, docs) => {
        if (err) throw err;

        dataHandler(docs);
    })
}

module.exports.findAll = findAll
module.exports.saveFile = save
