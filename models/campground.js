const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true //these are no longer support options since mongoose 6
}); //看mongoose

const CampgroundSchema = new Schema({ //schema可以理解为一种模式
    title:String,
    image:String,
    price:Number,
    description:String,
    location:String
});//注意，冒号后面的permitted SchemaTpye有String，Number，Date等

module.exports = mongoose.model('Campground',CampgroundSchema)