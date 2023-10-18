const express = require('express');
const multer = require('multer');
const Router = express.Router();
const FileController = require('../controllers/FileController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Setting up the directory to upload files
    },
    filename: function (req, file, cb) {
        const originalnameWithoutExtension = file.originalname.split('.').slice(0, -1).join('.');
        const uniqueSuffix = Date.now();
        cb(null, `${originalnameWithoutExtension}-${uniqueSuffix}.csv`);// Creating a unique file name 
    }
});

const uploads = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "text/csv") {
            cb(null, true);
        } else {
            cb(null, false);
            req.flash('error', 'Only csv files are allowed to upload.');
            // cb(new Error('I don\'t have a clue!'))
            return;
        }
    }
});

Router.get('/', FileController.index);
Router.post('/file/upload', uploads.single('csvFile'), FileController.upload);
Router.get('/file/delete/:filename', FileController.deleteFile);
Router.get('/file/view/:filename', FileController.viewFile);

module.exports = Router;