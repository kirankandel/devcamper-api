const express = require('express');
const dotenv = require('dotenv');

//Route Files
const bootcamps = require('./routes/bootcamps.route');
//Load environment variables
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

//Mount Routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})