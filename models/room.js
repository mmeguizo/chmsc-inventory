const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
// const globalconnetion = require('../serverconnetion/connections');



/****************************************************************** */
//VALIDATORS SHOULD BE ABOVE THE SCHEMA


/******************************************************************************************* */

const roomSchema = new Schema({

  room: { type: Number, required: true, unique: true, },
  status: { type: String, default: 'active' },
  deleted: { type: Boolean, default: false },

});


/****************************************************************************** */

// moduleuserSchema.pre('save', (next) => ****does not work with es6 syntax**** use functions old style
//VALIDATORS SHOULD BE ABOVE THE SCHEMA


module.exports = mongoose.model('Room', roomSchema);






