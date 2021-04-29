const Room = require('../models/room'); // Import Room Model Schema
const { nanoid } = require('nanoid')
// const globalconnetion = require('../serverconnetion/connections');
module.exports = (router) => {


    router.get('/getAllRoom', (req, res) => {

        // Search database for all blog posts
        Room.find({ deleted: false }, { _id: 1, room: 1, status: 1, deleted: 1 }, (err, Room) => {
            // Check if error was found or not
            if (err) {
                res.json({ success: false, message: err }); // Return error message
            } else {
                // Check if blogs were found in database
                if (!Room) {
                    res.json({ success: false, message: 'No Room found.' }); // Return error of no blogs found
                } else {
                    // globalconnetion.emitter('get_Room')

                    res.json({ success: true, room: Room }); // Return success and blogs array
                }
            }
        }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
    });


    // router.post('/addRoom', (req, res) => {

    //     console.log('addRoom route');
    //     console.log(req.body);
    // });


    router.post('/addRoom', (req, res) => {

        if (!req.body.room) {
            res.json({ success: false, message: 'You must provide an room' })
        } else {


            let room = new Room({
                room: req.body.room
            })

            room.save((err, data) => {
                if (err) {
                    if (err.code === 11000) {

                        res.json({ success: false, message: 'Room name already exists ', err: err.message })
                    } else {

                        res.json({ success: false, message: 'Could not save Room Error : ' })

                    }
                } else {
                    res.json({ success: true, message: 'Room Registered successfully', rooms: { room: data.room } });
                    // globalconnetion.emitter('Room')
                }
            })
        }

    });


    router.put('/changeStatus', (req, res) => {



        let data = req.body


        if (data.status === 'active') {

            Room.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'inactive' }

                }, (err, Room) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Deactivate Room' + err })
                    } else {
                        res.json({ success: true, message: data.Roomname + ' successfully Deactivated', data: Room });
                        // globalconnetion.emitter('Room_stats')
                    }
                })

        } else {

            Room.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'active' }

                }, (err, Room) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Activate Room' + err })
                    } else {
                        res.json({ success: true, message: data.Roomname + ' successfully Activate', data: Room });
                        // globalconnetion.emitter('Room')
                    }
                })
        }

    });



    router.put('/deleteRoom', (req, res) => {

        let data = req.body

        Room.updateOne({
            _id: data._id
        },
            {
                $set: { deleted: true }

            }, (err, Room) => {
                if (err) {
                    res.json({ success: false, message: 'Could not Delete Room' + err })
                } else {
                    res.json({ success: true, message: data.Roomname + ' Successfully Deleted the Room', data: Room });
                    // globalconnetion.emitter('Room')
                }
            })


    });




    router.put('/updateRoom', (req, res) => {



        let RoomData = {};
        let data = req.body
        RoomData.room = parseInt(data.room);
        // RoomData.room = '311';

        Room.findOneAndUpdate({ _id: data._id }, RoomData, { upsert: true }, (err, response) => {
            if (err) return res.json({ success: false, message: err.message });
            if (response) {
                res.json({ success: true, message: "Room Information has been updated!", room: response });
            } else {
                res.json({ success: false, message: "No Room has been modified!", room: response });
            }
        });


        // if (typeof Room.room === 'string') {
        //     res.json({ success: false, message: "Rooms should be Number", room: response });
        // } else if (typeof Room.room === 'number') {
        //     Room.findOneAndUpdate({ _id: data._id }, RoomData, { upsert: true }, (err, response) => {
        //         if (err) return res.json({ success: false, message: err.message });
        //         if (response) {
        //             res.json({ success: true, message: "Room Information has been updated!", room: response });
        //         } else {
        //             res.json({ success: false, message: "No Room has been modified!", room: response });
        //         }
        //     });
        // }


    });



    router.put('/changeRoomStatus', (req, res) => {

        let data = req.body

        console.log(data);


        if (data.status === 'active') {
            Room.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'inactive' }

                }, (err, room) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Deactivate Room' + err })
                    } else {
                        res.json({ success: true, message: data.room + ' successfully Deactivated Room', room: room });
                        // globalconnetion.emitter('user_stats')
                    }
                })

        } else {
            Room.updateOne({
                _id: data._id
            },
                {
                    $set: { status: 'active' }

                }, (err, room) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not Activate Room' + err })
                    } else {
                        res.json({ success: true, message: data.room + ' successfully Activate Room ', room: room });
                        // globalconnetion.emitter('user')
                    }
                })
        }

    });









    return router;
};


