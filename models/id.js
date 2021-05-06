'use strict';

(async function init() {

    const
        base = require('path').basename(__filename).split('.')[0],
        mongoose = require('mongoose'),
        unsetError = mongoose.set('useFindAndModify', false),

        Id = module.exports = mongoose.model(base, mongoose.Schema({
            model: { type: String, maxlength: 80, required: true },
            nextId: { type: Number, maxlength: 7, required: true },
        }, { strict: true }));

    /**
     * @param {String} model create id entry for this model
     * @param {Number} counter where value of id starts with; default: 100001
     * @return {Object} callback function
     */
    module.exports.generate = async (model, callback, counter = 4343) => {
        if (await isIdNameFound({ model: model })) {
            Id.findOneAndUpdate(
                { model: model },
                { $inc: { "nextId": 1 } },
                { upsert: true, returnNewDocument: true }
                , (err, result) => {
                    if (err) {
                        return callback({ success: false, message: err.message });
                    } else {
                        return callback({ success: true, id: result.nextId });
                    }
                });
        } else {
            await Id.create({
                model: model,
                nextId: counter + 1
            }, (err) => {
                if (err) {
                    return callback({ success: false, message: err.message });
                } else {
                    return callback({ success: true, id: counter });
                }
            });
        }
    }

    /**
     * @param {Object} data object and values to check
     * @return {Promise} Boolean true or false
     */
    function isIdNameFound(data) {
        return new Promise((resolve, reject) => {
            if (Object.keys(data).length) {
                Id.findOne(data, (err, findOneResult) => {
                    if (err) reject(false);
                    resolve(findOneResult ? true : false);
                });
            } else {
                reject(false);
            }
        });
    }

})();