const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
  type: String,  // operator or operand
  left: { type: Schema.Types.ObjectId, ref: 'Node' }, // for operator nodes
  right: { type: Schema.Types.ObjectId, ref: 'Node' }, // for operator nodes
  value: String // for operand nodes
});

const RuleSchema = new Schema({
  name: String,
  root: { type: Schema.Types.ObjectId, ref: 'Node' }
});

module.exports = mongoose.model('Rule', RuleSchema);
