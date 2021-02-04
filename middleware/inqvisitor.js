const Inqvisitor = require('../models/inqvisitor');

module.exports = async function(req, res, next) {
    if (!req.session.inqvisitor) {
        return next();
    }

    req.inqvisitor = await Inqvisitor.findById(req.session.inqvisitor._id);
    next();
}