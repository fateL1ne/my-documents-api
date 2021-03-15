const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, (err) => {
    if (err) throw err;
});

const FileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    originalname: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    size: {
        type: Number
    },
    owner: {
        type: String
    },
    encoding: {
        type: String
    },
    path: {
        type: String
    }
});


const FileModel = mongoose.model('Files', FileSchema);

exports.FileModel = FileModel