const User = require('../models/user'); // Import User Model Schema

module.exports = (router) => {


    router.get('/getAllUser', (req, res) => {

        // Search database for all blog posts
        User.find({}, (err, user) => {
            // Check if error was found or not
            if (err) {
                res.json({ success: false, message: err }); // Return error message
            } else {
                // Check if blogs were found in database
                if (!user) {
                    res.json({ success: false, message: 'No User found.' }); // Return error of no blogs found
                } else {
                    res.json({ success: true, user: user }); // Return success and blogs array
                }
            }
        }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
    });


    return router;
};