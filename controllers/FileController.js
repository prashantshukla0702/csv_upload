const Files = require('../models/Files');
const fs = require('fs');
const csv = require('csv-parser');

const index = (req, res) => {
    Files.find({}).then((data) => {
        return res.render('home', {
            title: 'Home',
            files: data
        });
    }).catch((err) => {
        console.log(err, 'Error in retrieving files.');
    });

}

const upload = async (req, res) => {

    // Check if the file is selected
    if (req.session.flash.error) {
        return res.redirect('back');
    }

    if (!req.file) {
        req.flash('error', 'File field cannot be null.');
        return res.redirect('back');
    }
    // Validate the file type
    if (req.file.mimetype !== 'text/csv') {
        req.flash('error', 'Only csv files are allowed to upload.');
        return res.redirect('back');
    }

    await Files.create({
        filetype: req.file.filetype,
        filename: req.file.filename,
        filepath: req.file.path
    }).then((data) => {
        req.flash('success', 'File has been Uploaded Successfully.');
        res.redirect('back');
    }).catch((err) => {
        console.log('Error in inserting file', err);
        req.flash('error', 'Error in Uploading file.');
        res.redirect('back');
    });

}

const deleteFile = async (req, res) => {
    const { filename } = req.params; // retrieve filename from param
    const filePath = `uploads/${filename}`;

    if (fs.existsSync(filePath)) { // check if file exists on server

        fs.unlinkSync(filePath); // Delete the file from Server
        await Files.deleteOne({ filename: filename }) // Delete the file from DB
            .then(() => {
                req.flash('success', 'File has been Deleted Successfully.');
                res.redirect('back');
            })
            .catch((err) => {
                req.flash('error', 'Something Went Wrong');
                res.redirect('back');
            });
    } else {
        req.flash('error', 'File Not Found');
        return res.redirect('back');
    }

}

const viewFile = async (req, res) => {
    const results = [];
    const headers = [];
    const { filename } = req.params;
    await Files.findOne({ filename: filename }) // Searching a file with the filename
        .then((file) => {
            fs.createReadStream(file.filepath) // Read a csv file 
                .pipe(csv())
                .on('headers', (headdata) => {
                    headdata.map((head) => {
                        headers.push(head);  // fetching the header data and pushing into the "headers" variable
                    });
                })
                .on('data', (data) => results.push(data)) // fetching the rows data and pushing into the "results" variable
                .on('end', () => {
                    res.render('viewFile', {
                        title: 'View | ' + filename.split('.')[0], // Sending a file name without ".csv" and file data to the ejs file
                        header: headers,
                        data: results

                    });
                });
        })
        .catch((err) => {

        });
}

module.exports = { index, upload, deleteFile, viewFile } // Exports all funtions