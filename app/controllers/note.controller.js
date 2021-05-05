const Note = require('../models/note.model');

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
    const { page, limit, sortBy, orderBy, searchBy, searchText } = req.query;
    const sort  = {}
    const search = {}
    if(sortBy && orderBy) {
        sort[sortBy] = orderBy === 'desc' ? -1 : 1
    }
    if(searchBy && searchText) {
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        search[searchBy] = rgx(searchText)
    }
    try {
        const notes = await Note
            .find(search)
            .limit(parseInt(limit,10))
            .skip((page -1) * limit)
            .sort(sort)
            .exec();

        const count = await Note
            .find(search)
            .countDocuments()

        await res.json({
            notes,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page, 10),
            pageSize: parseInt(limit, 10),
            totalCount: parseInt(count, 10),
            hasNextPage: parseInt(page, 10) < Math.ceil(count / limit),
            hasPreviousPage: parseInt(page, 10) !== 1
        });
    } catch (e) {
        console.log('error while getting data')
    }
};