const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/univs');

const Schema = mongoose.Schema;

const universitySchema = new Schema({
	name: { type: String },
	city: { type: String },
	founded: { type: Number }
});
const University = mongoose.model('universities', universitySchema);

module.exports = University;
