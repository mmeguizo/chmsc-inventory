const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
// const globalconnetion = require('../serverconnetion/connections');
const { nanoid } = require('nanoid')


/****************************************************************** */
//VALIDATORS SHOULD BE ABOVE THE SCHEMA


/******************************************************************************************* */

const categorySchema = new Schema({

  category_name: { type: String, required: true, unique: true, },
  category_status: { type: String, default: 'active' },
  deleted: { type: Boolean, default: false },
  id: { type: String, default: () => nanoid() },

});


/****************************************************************************** */

// moduleuserSchema.pre('save', (next) => ****does not work with es6 syntax**** use functions old style
//VALIDATORS SHOULD BE ABOVE THE SCHEMA


module.exports = mongoose.model('Category', categorySchema);






