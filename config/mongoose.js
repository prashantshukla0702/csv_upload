const mongoose = require('mongoose');
const dburl = process.env.DATABASE_URL;
mongoose.connect(dburl);

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err, "Error in database connectcion");
});

db.once('connection', (err, res) => {
    console.log('Database connected', res)
})