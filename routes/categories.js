const Category = require('../models/category'); // Import Category Model Schema
const { nanoid } = require('nanoid')
const Id = require('../models/id')

// const globalconnetion = require('../serverconnetion/connections');
module.exports = (router) => {


    router.get('/getAllCategory', (req, res) => {

        // Search database for all blog posts

        Category.aggregate([
            {
                $match: { deleted: false }
            }
        ], (err, Category) => {
            if (err) return res.json({ success: false, message: err.message });
            if (Category) {
                // lib.createEmit('types');
                //   return cb({ success: true, data: res });
                res.json({ success: true, data: Category });
            } else {
                res.json({ success: false, message: "No Category found!", toaster: 'off' });
            }
        }
        );




    });




    router.post('/addCategory', (req, res) => {

        if (!req.body.category) {
            res.json({ success: false, message: 'You must provide an category' })
        } else {
            Id.generate('category', async (uniqueID) => {
                if (uniqueID) {
                    let category = new Category({
                        category_name: req.body.category,
                        id: uniqueID.id
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
                        }
                    })
                } else {
                    console.info('generate main id query failed');
                }
            });
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

        Category.deleteOne({
            id: data.id
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


        let data = req.body.category

        console.log(data);


        Category.findOneAndUpdate(
            { id: +data.id },
            {
                $set: {
                    category_name: data.category
                }
            },
            { upsert: true },
            (err, datas) => {

                if (datas) {
                    res.json({ success: true, data: datas });
                }
                else {
                    res.json({ success: false, message: 'Could not Update Category' + err })
                }
            }
        )


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


