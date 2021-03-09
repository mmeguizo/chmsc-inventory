const User = require('../models/user'); // Import User Model Schema
const globalconnetion = require('../serverconnetion/connections');

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


    // router.post('/addUser', (req, res) => {

    //     console.log('addUser route');
    //     console.log(req.body);
    // });


    router.post('/addUser', (req, res) => {

        if (!req.body.email) {
            res.json({ success: false, message: 'You must provide an email' })
        } else {

            if (!req.body.username) {
                res.json({ success: false, message: 'You must provide an username' })
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'You must provide an password' })

                } else {
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password,
                        role: req.body.role.toLowerCase(),
                    })

                    user.save((err, data) => {
                        if (err) {
                            if (err.code === 11000) {

                                res.json({ success: false, message: 'User name or Email already exists ', err: err.message })
                            } else {

                                if (err.errors) {
                                    //for specific error email,username and password
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message })
                                    } else {
                                        if (err.errors.username) {
                                            res.json({ success: false, message: err.errors.username.message })
                                        } else {
                                            if (err.errors.password) {
                                                res.json({ success: false, message: err.errors.password.message })
                                            } else {
                                                res.json({ success: false, message: err })
                                            }
                                        }
                                    }

                                } else {
                                    res.json({ success: false, message: 'Could not save user Error : ' })
                                }
                            }
                        } else {
                            res.json({ success: true, message: 'Account Registered successfully', data: { email: data.email, username: data.username } });
                            globalconnetion.emitter('user')
                        }
                    })

                }
            }
        }
        // res.send('POST in authetication')
    });


    globalconnetion.makeSocket((client, io) => {
        return client.on('user', (data) => {
            io.emit('user', { success: true, data: data })
        });
    });




    return router;
};


