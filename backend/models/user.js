const mongoose= require('mongoose');

//notre modele 'Author'
const User = mongoose.model('user', {
Name : {
    type: String
},
LastName : {
    type: String
},
Email : {
    type: String,
    unique : true 
},
Password : {
    type: String
},
About : {
    type: String
},
Mobile : {
    type: String
},
Adresse : {
    type: String
},
Image : {
    type: String
}
})

module.exports = User;