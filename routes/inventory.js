const Inventory = require('../models/inventory'); // Import Inventory Model Schema
const { nanoid } = require('nanoid')
const Id = require('../models/id')

// const globalconnetion = require('../serverconnetion/connections');
module.exports = (router) => {


    router.get('/getAllInventory', (req, res) => {



        Inventory.aggregate([

            {
                "$lookup": {
                    "from": "categories",
                    "localField": "category_id",
                    "foreignField": "id",
                    "as": "category"
                }
            },
            {
                "$unwind": {
                    "path": "$category",
                    "includeArrayIndex": "arrayIndex",
                    "preserveNullAndEmptyArrays": false
                }
            },
            {
                "$lookup": {
                    "from": "rooms",
                    "localField": "room_id",
                    "foreignField": "id",
                    "as": "room"
                }
            },
            {
                "$unwind": {
                    "path": "$room",
                    "includeArrayIndex": "arrayIndex",
                    "preserveNullAndEmptyArrays": false
                }
            },
            {
                "$match": {
                    "status": "active",
                }
            },
            {
                "$project": {

                    "_id": "$_id",
                    "id": "$id",
                    "borrowed": "$borrowed",
                    "status": "$status",
                    "category_id": "$category.category_name",
                    "brand": "$brand",
                    "serial": "$serial",
                    "model": "$model",
                    "description": "$description",
                    "room_id": "$room.room",
                }
            }

            // { $sort : { invoice : 1} },
        ], (err, Inventory) => {

            //replace object id with tid for history purposes
            if (err) {
                res.json({ success: false, message: err }); // Return error message
            } else {
                // Check if blogs were found in database
                if (!Inventory) {
                    res.json({ success: false, message: 'No Inventory found.' }); // Return error of no blogs found
                } else {
                    // globalconnetion.emitter('get_Inventory')

                    res.json({ success: true, inventory: Inventory }); // Return success and blogs array
                }
            }
        })
    });


    router.post('/addInventory', (req, res) => {

        let data = req.body;

        if (!req.body.brand) {
            res.json({ success: false, message: 'You must provide an values ' })
        } else {

            Inventory.aggregate([
                {
                    $project: {
                        "_id": 1,
                        "brand": "$brand",
                        "status": "$status",

                    }
                },
                {
                    $match: { inventory: req.body.brand, status: 'active' }
                },
            ], (err, response) => {

                if (err) return res.json({ success: false, message: err.message })
                if (response.length === 0) {


                    Id.generate('inventory', async (uniqueID) => {
                        if (uniqueID) {

                            let inventoryData = {
                                category_id: data.category,
                                brand: data.brand,
                                model: data.model,
                                serial: data.serial,
                                description: data.description,
                                room_id: data.room,
                                id: uniqueID.id,
                            }

                            Inventory.create(inventoryData, (err, inventory) => {

                                if (inventory) {
                                    res.json({ success: true, message: 'Inventory Registered successfully', inventory: inventory });
                                    return cb(response);
                                } else {
                                    res.json({ success: false, message: 'Could not save Inventory Error : ', err: err.message })
                                }
                            });

                        } else {
                            console.info('generate main id query failed');
                        }
                    })

                } else {
                    return cb({ success: false, message: "Duplicate Type, pick a Inventory  name" })
                }
            });
        }
    });


    router.put('/changeStatus', (req, res) => {



        let data = req.body


        if (data.status === 'active') {

            Inventory.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'inactive' }

                }, (err, Inventory) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Deactivate Inventory' + err })
                    } else {
                        res.json({ success: true, message: data.Inventoryname + ' successfully Deactivated', data: Inventory });
                        // globalconnetion.emitter('Inventory_stats')
                    }
                })

        } else {

            Inventory.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'active' }

                }, (err, Inventory) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Activate Inventory' + err })
                    } else {
                        res.json({ success: true, message: data.Inventoryname + ' successfully Activate', data: Inventory });
                        // globalconnetion.emitter('Inventory')
                    }
                })
        }

    });



    router.put('/deleteInventory', (req, res) => {

        let data = req.body

        Inventory.deleteOne({
            _id: data._id
        }, (err, Inventory) => {
            if (err) {
                res.json({ success: false, message: 'Could not Delete Inventory' + err })
            } else {
                res.json({ success: true, message: data.Inventoryname + ' Successfully Deleted the Inventory', data: Inventory });
                // globalconnetion.emitter('Inventory')
            }
        })


    });




    router.put('/updateInventory', (req, res) => {



        let InventoryData = {};
        let data = req.body
        InventoryData.inventory = parseInt(data.inventory);
        // InventoryData.inventory = '311';

        Inventory.findOneAndUpdate({ _id: data._id }, InventoryData, { upsert: true }, (err, response) => {
            if (err) return res.json({ success: false, message: err.message });
            if (response) {
                res.json({ success: true, message: "Inventory Information has been updated!", inventory: response });
            } else {
                res.json({ success: false, message: "No Inventory has been modified!", inventory: response });
            }
        });


        // if (typeof Inventory.inventory === 'string') {
        //     res.json({ success: false, message: "Inventorys should be Number", inventory: response });
        // } else if (typeof Inventory.inventory === 'number') {
        //     Inventory.findOneAndUpdate({ _id: data._id }, InventoryData, { upsert: true }, (err, response) => {
        //         if (err) return res.json({ success: false, message: err.message });
        //         if (response) {
        //             res.json({ success: true, message: "Inventory Information has been updated!", inventory: response });
        //         } else {
        //             res.json({ success: false, message: "No Inventory has been modified!", inventory: response });
        //         }
        //     });
        // }


    });



    router.put('/changeInventoryStatus', (req, res) => {

        let data = req.body

        console.log(data);


        if (data.status === 'active') {
            Inventory.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'inactive' }

                }, (err, inventory) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Deactivate Inventory' + err })
                    } else {
                        res.json({ success: true, message: data.inventory + ' successfully Deactivated Inventory', inventory: inventory });
                        // globalconnetion.emitter('user_stats')
                    }
                })

        } else {
            Inventory.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'active' }

                }, (err, inventory) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Activate Inventory' + err })
                    } else {
                        res.json({ success: true, message: data.inventory + ' successfully Activate Inventory ', inventory: inventory });
                        // globalconnetion.emitter('user')
                    }
                })
        }

    });









    return router;
};


