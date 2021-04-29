const Category = require('../models/category'); // Import Category Model Schema
const { nanoid } = require('nanoid')
// const globalconnetion = require('../serverconnetion/connections');
module.exports = (router) => {


    router.get('/getAllCategory', (req, res) => {

        // Search database for all blog posts
        Category.find({ deleted: false }, { _id: 1, category_name: 1, category_status: 1, deleted: 1 }, (err, Category) => {
            // Check if error was found or not
            if (err) {
                res.json({ success: false, message: err }); // Return error message
            } else {
                // Check if blogs were found in database
                if (!Category) {
                    res.json({ success: false, message: 'No Category found.' }); // Return error of no blogs found
                } else {
                    // globalconnetion.emitter('get_Room')
                    res.json({ success: true, category: Category }); // Return success and blogs array
                }
            }
        }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
    });


    // router.post('/addRoom', (req, res) => {

    //     console.log('addRoom route');
    //     console.log(req.body);
    // });


    router.post('/addCategory', (req, res) => {

        if (!req.body.category) {
            res.json({ success: false, message: 'You must provide an category' })
        } else {


            let category = new Category({
                category: req.body.category
            })

            category.save((err, data) => {
                if (err) {
                    if (err.code === 11000) {

                        res.json({ success: false, message: 'Category name already exists ', err: err.message })
                    } else {

                        res.json({ success: false, message: 'Could not save Category Error : ' })

                    }
                } else {
                    res.json({ success: true, message: 'Category Registered successfully', rooms: { category: data.category } });
                    // globalconnetion.emitter('Category')
                }
            })
        }

    });


    router.put('/changeStatus', (req, res) => {



        let data = req.body


        if (data.status === 'active') {

            Category.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'inactive' }

                }, (err, Category) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Deactivate Category' + err })
                    } else {
                        res.json({ success: true, message: data.Roomname + ' successfully Deactivated', data: Category });
                        // globalconnetion.emitter('Room_stats')
                    }
                })

        } else {

            Category.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'active' }

                }, (err, Category) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Activate Category' + err })
                    } else {
                        res.json({ success: true, message: data.Roomname + ' successfully Activate', data: Category });
                        // globalconnetion.emitter('Category')
                    }
                })
        }

    });



    router.put('/deleteCategory', (req, res) => {

        let data = req.body

        Category.updateOne({
            _id: data._id
        },
            {
                $set: { deleted: true }

            }, (err, Category) => {
                if (err) {
                    res.json({ success: false, message: 'Could not Delete Category' + err })
                } else {
                    res.json({ success: true, message: data.Roomname + ' Successfully Deleted the Category', data: Category });
                    // globalconnetion.emitter('Category')
                }
            })


    });




    router.put('/updateCategory', (req, res) => {



        let RoomData = {};
        let data = req.body
        RoomData.category = parseInt(data.category);
        // RoomData.category = '311';

        Category.findOneAndUpdate({ _id: data._id }, RoomData, { upsert: true }, (err, response) => {
            if (err) return res.json({ success: false, message: err.message });
            if (response) {
                res.json({ success: true, message: "Category Information has been updated!", category: response });
            } else {
                res.json({ success: false, message: "No Category has been modified!", category: response });
            }
        });


        // if (typeof Category.category === 'string') {
        //     res.json({ success: false, message: "Rooms should be Number", category: response });
        // } else if (typeof Category.category === 'number') {
        //     Category.findOneAndUpdate({ _id: data._id }, RoomData, { upsert: true }, (err, response) => {
        //         if (err) return res.json({ success: false, message: err.message });
        //         if (response) {
        //             res.json({ success: true, message: "Category Information has been updated!", category: response });
        //         } else {
        //             res.json({ success: false, message: "No Category has been modified!", category: response });
        //         }
        //     });
        // }


    });



    router.put('/changeCategoryStatus', (req, res) => {

        let data = req.body

        console.log(data);


        if (data.status === 'active') {
            Category.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'inactive' }

                }, (err, category) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Deactivate Category' + err })
                    } else {
                        res.json({ success: true, message: data.category + ' successfully Deactivated Category', category: category });
                        // globalconnetion.emitter('user_stats')
                    }
                })

        } else {
            Category.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'active' }

                }, (err, category) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Activate Category' + err })
                    } else {
                        res.json({ success: true, message: data.category + ' successfully Activate Category ', category: category });
                        // globalconnetion.emitter('user')
                    }
                })
        }

    });









    return router;
};


