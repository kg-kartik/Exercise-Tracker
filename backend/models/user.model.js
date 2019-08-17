const mongoose = require ('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({ 
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true, //for trimming whitespaces at the end of the string 
        minlength : 3
    },
 }, {
    timestamps : true,
    }
    );

const User = mongoose.model('User',userSchema); 
// user is our db model which is based on userSchema , the conditions

module.exports = User;
