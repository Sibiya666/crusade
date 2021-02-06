const Inquisitor = require('../models/inquisitor');

module.exports = async function(req, res, next) {
    if (!req.session.inquisitor) {
        return next();
    }

    req.inquisitor = await Inquisitor.findById(req.session.inquisitor._id);
    next();
}