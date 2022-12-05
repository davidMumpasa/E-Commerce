const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   name: {
      type: String,
      requre: true,
     },
     email: {
      type: String,
      requre: true,
     
     },
     passwordHash: {
      type: String,
      requre: true,
  },
   phone: {
   type: String,
   requre: true,
},

isAdnin: {
   type: String,
   default: false,
},
street: {
   type: String,
   default: ''
},
apartment: {
   type: String,
   default: '',
},
zip: {
   type: String,
   default: '',
},
city: {
   type: String,
   default: '',
},
country: {
   type: String,
   default: '',
}
})

userSchema.virtual('id').get(function () {
   return this._id.toHexString();
});

userSchema.set('toJSON', {
   virtuals: true,
});

exports.User = mongoose.model('User', userSchema);