// @desc    Get All Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show All Bootcamps' });
}

// @desc    Get A Bootcamp
// @route   GET /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Show ${req.params.id} Bootcamp` });
}

// @desc    Create New Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Public
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create New Bootcamp' });
}

// @desc    Update A Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update Bootcamp ${req.params.id}` });
}

// @desc    Delete A Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
}