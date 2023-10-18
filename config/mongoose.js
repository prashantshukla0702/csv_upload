const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/file_uploads');

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err, "Error in database connectcion");
});

db.once('connection', (err, res) => {
    console.log('Database connected', res)
})