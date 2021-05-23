const asyncHandler = require('../middleware/async.middleware');
const Bootcamp = require('../models/Bootcamp.model');
const geocoder = require('../utils/geocoder.utils');

// @desc    Get All Bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query;
    //Copy req.query
    let reqQuery = { ...req.query };
    //Fields to exclude
    const removeFields = ['select', 'sort'];
    //Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    //Create Query String
    let queryStr = JSON.stringify(req.query);
    //Create Operators ($gt,$gte... etc)
    queryStr = queryStr.replace(/\b(gt|gte|in)\b/g, match => `$${match}`);
    //Finding Resources
    query = Bootcamp.find(JSON.parse(queryStr));
    //Select Fields 
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    //Sort
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        query.sort('-createdAt');
    }
    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();
    query = query.skip(startIndex).limit(limit);
    //Executing Query
    const bootcamps = await query;
    //Pagination result
    const pagination = {};
    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit 
        }
    }
    if(startIndex > 0){
        pagination.prev = {
            page: page - 1,
            limit 
        }
    }
    res.status(200).json({ success: true, count: bootcamps.length, pagination, data: bootcamps });
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
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});
