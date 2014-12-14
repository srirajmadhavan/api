// grab the mongoose module
var mongoose = require('mongoose');

module.exports = mongoose.model('Route', {
    name: { type: String, default: '' },
    number: { type: Number, default: 0 }
});
