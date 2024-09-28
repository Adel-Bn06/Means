const mongoose= require('mongoose');

//notre modele 'Article'
const Article = mongoose.model('Article', {
Title : {
    type: String
},
IdAuth : {
    type: String
},
Description : {
    type: String
},
Date : {
    type: String
},
Content : {
    type: String
},
Image : {
    type: String
}
})

module.exports = Article;