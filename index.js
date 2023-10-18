const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const flash = require('connect-flash');
const FlashMiddleware = require('./config/FlashMiddleware');


// To Parse the Formdata
app.use(express.urlencoded({ extended: false }));
// To Parse to Json data
app.use(express.json());
// To use layouts in views
app.use(ejsLayouts);
// Serve static files from the 'assets' directory
app.use(express.static('assets'));
// Set the template engine for the views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'uploadsessions',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(FlashMiddleware.setflash);
// To mount a set of routes
app.use('/', require('./routes'));

// It will start the server
app.listen(port, (err) => {
    if (err) {
        console.log('Error in server', err);
    }

    console.log('Server is up');
});
