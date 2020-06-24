const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
    imagePublic_id: { type: String, required: true }
});

module.exports = model('Image', ImageSchema);