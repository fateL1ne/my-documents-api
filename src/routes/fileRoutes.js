const express = require('express');
const router = express.Router();
const multer = require('multer');
const { verifyJWT } = require('../services/authService');
const upload = multer({dest : process.env.UPLOAD_STORAGE});
const { saveFile } = require('../services/fileService');


router.post('/upload', verifyJWT, upload.single('file'), (req, res) => {
    req.file.owner = req.uuid;

    saveFile(req.file, 
        (err) => res.status(400).send(err), 
        () => res.send("Sucessfull uploaded")
    );
})

router.get("/:uuid", (req, res) => {
    
})

module.exports = router