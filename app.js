/*
    Author: Jingxian Zhang

    https://github.com/Jingxian2022/YelpCamp.git
*/

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const Campground = require('./models/campground'); //这里在require model
const exp = require('constants');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true //these are no longer support options since mongoose 6
}); //看mongoose

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",() =>{
    console.log("Database connected");
});//只是为了展示有没有connect好

const app = express();

app.engine('ejs',ejsMate)
app.set('view engine','ejs'); //set engine
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.get('/',(req,res) => { //'/'指的是localhost:3000;后面是request and response
    //res.send('HELLO FROM YELP CAMP!')
    res.render('home')
})

app.get('/campgrounds', async(req,res) => { 
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds}) //这里加个campgrounds，可以把参数传去index，否则index文件undefined
}) //又不懂了

app.get('/campgrounds/new', (req,res) =>{
    res.render('campgrounds/new')
})

app.post('/campgrounds', async(req,res) => { //对应了new.ejs的form
    const campground = new Campground(req.body.campground);//不懂为什么可以
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async(req,res,) => { 
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show',{campground}) //这里加个campgrounds，可以把参数传去index，否则index文件undefined
}) //又不懂了

app.get('/campgrounds/:id/edit', async(req,res,) => { 
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit',{campground}) //这里加个campgrounds，可以把参数传去index，否则index文件undefined
})

app.put('/campgrounds/:id', async(req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
})

app.delete('/campgrounds/:id',async(req,res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})

app.listen(3000,() => {
    console.log('Serving on port 3000')
}) //3000:port 采用localhost:3000可以进去server