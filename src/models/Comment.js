const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
  content:{type: String, required:true, unique: true },
  user:{type: mongoose.Types.ObjectId, required :true, ref: 'user'},
  blog:{type: mongoose.Types.ObjectId, required :true, ref: 'blog'}
},{timestamps:true})

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = {Comment}
