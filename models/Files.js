const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filetype: {
        type: String,
        require: true,
    },
    filename: {
        type: String,
        require: true
    },
    filepath: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

const File = mongoose.model('File', fileSchema, 'files');
module.exports = File;