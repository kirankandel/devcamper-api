const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const Bootcamp = require('./models/Bootcamp.model');

//Load env vars
dotenv.config({path: './config/config.env'});

//connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

//Read json files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

//Import into db
const importData = async() => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data imported...'.green.inverse);
    } catch (err) {
     console.error(err);   
    }
}

//Import into db
const deleteData = async() => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data deleted...'.red.inverse);
    } catch (err) {
     console.error(err);   
    }
}

if(process.argv[2] === '-i'){
    importData();
}else if(process.argv[2] === '-d'){
    deleteData();
}
