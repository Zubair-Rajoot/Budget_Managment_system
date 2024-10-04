const { default: mongoose } = require('mongoose')
const mongosse = require('mongoose')

//schema design
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'name is required'],
    },

    email:{
        type: String,
        required: [true, 'email is required and should be unique'],

    },

    password:{
        type: String,
        required: [true, 'password is required and should be unique'],
    },

},
    { timestamps: true},
);

const userModel = mongoose.model('users', userSchema)
module.exports = userModel;