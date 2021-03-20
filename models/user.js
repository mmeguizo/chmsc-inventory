const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
var bcrypt = require('bcryptjs');
// const globalconnetion = require('../serverconnetion/connections');



/****************************************************************** */
//VALIDATORS SHOULD BE ABOVE THE SCHEMA

//email validators
let emailLengthChecker = (email) => {

  if (!email) {
    return false;
  } else {
    if (email.length < 5 || email.length > 30) {
      return false;
    } else {
      return true;
    }
  }
}


let validEmailChecker = (email) => {

  if (!email) {
    return false;
  } else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email); // Return regular expression test results (true or false)
  }
}


const emailValidator = [
  {
    validator: emailLengthChecker, message: 'Email must be at least 5 characters but no more than 30 characters'
  },
  {
    validator: validEmailChecker, message: 'Enter a valid email address'
  }
];



//usernanme validators

let usernameLengthChecker = (username) => {
  if (!username) {
    return false;
  } else {
    if (username.length < 3 || username.length > 15) {
      return false;
    } else {
      return true;
    }
  }
}

let validUsername = (username) => {

  if (!username) {
    return false
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username); // Return regular expression test result (true or false)
  }

}


const usernameValidators = [

  {
    validator: usernameLengthChecker, message: 'Username should be at least 3 characters long and at least 15 characters'
  },
  {
    validator: validUsername, message: 'Username should be alphanumeric and no special characters'
  }


];



//password validators



let passwordLengthChecker = (password) => {

  if (!password) {
    return false;
  } else {
    if (password.length < 8 || password.length > 35) {
      return false;
    } else {
      return true;
    }
  }

}

let validPassword = (password) => {

  if (!password) {
    return false;
  } else {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password); // Return regular expression test result (true or false)
  }
}


let passwordValidator = [

  {
    validator: passwordLengthChecker, message: 'Password must be at least 8 characters long but not more than 35 characters long'
  },
  {
    validator: validPassword, message: 'Password must have at least one upper case,  lower case letter, special characters and numbers'
  }

]


/******************************************************************************************* */

const userSchema = new Schema({

  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidator },
  username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
  role: { type: String, required: true },
  status: { type: String, default: 'active' },
  deleted: { type: Boolean, default: false },
  password: { type: String, required: true, validate: passwordValidator }

});


/****************************************************************************** */

// moduleuserSchema.pre('save', (next) => ****does not work with es6 syntax**** use functions old style
//VALIDATORS SHOULD BE ABOVE THE SCHEMA
userSchema.pre('save', function (next) {

  if (!this.isModified('password')) {

    return next()

  } else {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err); // Ensure no errors
        this.password = hash; // Apply encryption to password
        next(err); // Exit middleware
      });
    });
  }

})

// (password) => ****does not work with es6 syntax**** use functions old ways
userSchema.methods.comparePassword = function (password) {

  return bcrypt.compare(password, this.password); // this return a promise
  //async 
  //  bcrypt.compare(password, this.password, (err, res) => {
  //     console.log({ err: err });
  //     console.log({ res: res });
  // });
}
// userSchema.methods.encryptPassword = function (password) {

//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(this.password, salt, (err, hash) => {
//       if (err) return next(err); // Ensure no errors
//       this.password = hash; // Apply encryption to password
//       next(err); // Exit middleware
//     });
//   });
//   // return bcrypt.compare(password, this.password); // this return a promise
//   //async 
//   //  bcrypt.compare(password, this.password, (err, res) => {
//   //     console.log({ err: err });
//   //     console.log({ res: res });
//   // });
// }



module.exports = mongoose.model('User', userSchema);





// const bcrypt = require("bcryptjs")

// const password = "mypass123"
// const saltRounds = 10

// bcrypt.genSalt(saltRounds, function (err, salt) {
//   if (err) {
//     throw err
//   } else {
//     bcrypt.hash(password, salt, function(err, hash) {
//       if (err) {
//         throw err
//       } else {
//         console.log(hash)
//         //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
//       }
//     })
//   }
// })








// const Users = module.exports = mongoose.model('User', userSchema);


// module.exports.register = (data, callback) => {
//     var user = new Users({

//         email: data.email,
//         username: data.username,
//         password: data.password

//     });
//     user.save(callback);

// };




