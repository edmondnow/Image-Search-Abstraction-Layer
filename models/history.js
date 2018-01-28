const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema and model

const HistorySchema = new Schema({
	text: String,
	time: Date
});

const HistoryEntry = mongoose.model('historyentry', HistorySchema);

module.exports = HistoryEntry;