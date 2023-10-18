module.exports.setflash = (req, res, next) => {
    res.locals.flash = {
        'success': req.flash('success'), // Sets the value of success message in locals
        'error': req.flash('error') // Sets the value of error message in locals 
    }

    next();  // Move to the next middleware/route handler
}
