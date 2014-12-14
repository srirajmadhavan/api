// grab the mongoose module
var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    email: { type: String, default: '' },
    name: { type: String, default: '' },
    route: { type: Number, default: 0 }
});
