// 'use strict';


// (async function initialize() {

//     let socketsData = [], emitter;

//     module.exports.makeSocket = (sockets) => {
//         let exists = false;
//         socketsData.forEach(fn => {
//             if (fn.toString() === sockets.toString()) {
//                 exists = true;
//             }
//         });
//         if (!exists)
//             socketsData.push(sockets);
//     }


//     module.exports.socketconnect = () => {
//         return {

//             socket: (http, port) => {
//                 const io = require('socket.io')(http, { 
//                     cors: {
//                         origin: '*',
//                       }
//                  });
//                 emitter = require('socket.io-client').connect(`http://localhost:${port}`);
//                 return {
//                     start: () => {
//                         let i = 0;
//                         io.on('connection', client => {
//                             socketsData.forEach(sockets => {
//                                 sockets(client, io);
//                             });

//                             client.on('disconnect', client => {
//                                 console.log('client socket connections');
//                                 console.log(client);

//                             });

//                         });
//                         console.log(`${socketsData.length} (っ◔◡◔)っ  Active Socket  `);
//                         return io;
//                     }
//                 }
//             }


//         }

//     }

//     const EmitMaker = module.exports.emitter = (emitTo, data = null) => {
//         emitter.emit(emitTo, data);
//     }

// })();