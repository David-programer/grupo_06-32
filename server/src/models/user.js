const {model, Schema}= require('mongoose');

module.exports = new model('user', new Schema({
    name : {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true}, 
    country: {type: String, required: true}, 
    city: {type: String, required: true}, 
    password: {type: String, required: true}
},{
    collection: 'users'
}));