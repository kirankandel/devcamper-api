const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
//Load environment variables
dotenv.config({ path: './config/config.env' });
//Connect to database
connectDB();
//Route Files
const bootcamps = require('./routes/bootcamps.route');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Mount Routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

//Handle Unhandled Promise Rejection 
// eslint-disable-next-line no-unused-vars
process.on('unhandeldRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`.red);
    //Close Server and Exit Process
    server.close(()=> process.exit(1));
})