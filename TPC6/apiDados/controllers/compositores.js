var mongoose = require('mongoose');
const { modelName } = require('../models/compositores');
var Compositor = require('../models/compositores');

module.exports.list = () => {
    return Compositor
        .find()
        .sort({nome : 1})
        .exec();
}

module.exports.get = (id) => {
    return Compositor
        .findById(id)
        .exec();
}

module.exports.insert = (compositor) => {
    var newCompositor = new Compositor(compositor);

    return newCompositor.save();
}

module.exports.update = (id, compositor) => {
    return Compositor
        .findByIdAndUpdate(id, compositor, {new : true})
        .exec();
}

module.exports.delete = (id) => {
    return Compositor
        .findByIdAndDelete(id)
        .exec();

    /*
    Compositor
        .find({_id: id})
        .deleteOne()
        .exec();
    */
}