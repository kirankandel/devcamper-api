const asyncHandler = require('../middleware/async.middleware');
const Bootcamp = require('../models/Bootcamp.model');
const geocoder = require('../utils/geocoder.utils');

// @desc    Get All Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc    Get A Bootcamp
// @route   GET /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Create New Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Public
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
});

// @desc    Update A Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!bootcamp) {
        return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Delete A Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
        return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
});

// @desc    Get Bootcamp Within A Radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;
    //Get Lat Long From GeoCoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].lat;
    const lng = loc[0].lng;
    //Calculate radius using radians
    //Divide dist by radius of earth
    //Earth Radius = 2963 miles / 6378 kms
     const radius = distance / 6378;
     const bootcamps = await Bootcamp.find({
         location: {$geoWithin: { $centerSphere : [[lng, lat], radius]}}
     });
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});
