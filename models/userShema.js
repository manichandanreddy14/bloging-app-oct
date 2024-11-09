const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Kindly Input the First Name"],
    },
    email: {
        type: String,
        required: [true, "Kindly Input the email"],
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
})

const userShema = mongoose.model('User', userSchema);
module.exports =userShema;