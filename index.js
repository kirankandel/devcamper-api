const express = require('express');
const dotenv = require('dotenv');

//Load environment variables
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

app.get('/api/v1/bootcamps', (req, res) => {
    res.status(200).json({ success: true, msg: 'Show All Bootcamps' });
})

app.get('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Show ${req.params.id} Bootcamp` });
})

app.post('/api/v1/bootcamps', (req, res) => {
    res.status(200).json({ success: true, msg: 'Show All Bootcamps' });
})

app.put('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Display Bootcamp ${req.params.id}` });
})

app.delete('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})