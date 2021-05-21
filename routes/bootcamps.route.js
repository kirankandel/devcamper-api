const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Show All Bootcamps' });
})

router.get('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Show ${req.params.id} Bootcamp` });
})

router.post('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Show All Bootcamps' });
})

router.put('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Display Bootcamp ${req.params.id}` });
})

router.delete('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
})

module.exports = router;