const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
// const globalconnetion = require('../serverconnetion/connections');
const { nanoid } = require('nanoid')


/****************************************************************** */
//VALIDATORS SHOULD BE ABOVE THE SCHEMA


/******************************************************************************************* */

const inventorySchema = new Schema({

  brand: { type: String, },
  description: { type: String, },
  room_id: { type: Number, },
  category_id: { type: Number, },
  serial: { type: Number, },
  borrowed: { type: String, default: 'no' },
  brand: { type: String, },
  model: { type: String, },
  status: { type: String, default: 'active' },
  id: { type: Number, required: true, },

});


/****************************************************************************** */

// moduleuserSchema.pre('save', (next) => ****does not work with es6 syntax**** use functions old style
//VALIDATORS SHOULD BE ABOVE THE SCHEMA


module.exports = mongoose.model('Inventory', inventorySchema);






/*

Name	Brand	Model	Description	Assigned Room	Serial No.	Borrowed	Status	Options
*/