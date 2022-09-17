const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelper')
const Campground = require('../models/campground') //这里多加了一个点，就是back out一个文件夹

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true //these are no longer support options since mongoose 6
}); //看mongoose

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",() =>{
    console.log("Database connected, creating database...");
});//只是为了展示有没有connect好

const sample = array => array[Math.floor(Math.random()*array.length)];//尼玛，这里如果加{}就undefined，不知道为啥

const seedDB = async () => {
     await Campground.deleteMany({});
    // const c = new Campground({title:'purple field'})
    // await c.save();
     for(let i = 0; i<50; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random()*30)+10
        const camp = new Campground({
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image:'https://images.unsplash.com/photo-1476790422463-0f61b4722b8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODQzNTF8fHx8fHx8MTY2MzM3OTA5OQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
            description:'A great place to enjoy!!',
            price:price
        })
        await camp.save();
    } 
}

//seedDB();
seedDB().then(() => {
    mongoose.connection.close();
})