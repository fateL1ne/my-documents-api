const express = require('express');
const router = express.Router();
const multer = require('multer');
const { verifyJWT } = require('../services/authService');
const upload = multer({dest : process.env.UPLOAD_STORAGE});
const { saveFile, findAll } = require('../services/fileService');


router.post('/upload', verifyJWT, upload.single('file'), (req, res) => {
    req.file.owner = req.uuid;

    if (!req.file) {
        res.status(400).send("Missing file")
    }
    
    saveFile(req.file, 
        (err) => res.status(400).send(err), 
        () => res.send("Sucessfull uploaded")
    );
})


router.get("/documents", verifyJWT, (req, res) => {
    findAll(req.uuid, (docs) => {
        res.send(docs);
    });
})

module.exports = router