const mongoose = require('mongoose');


const BlogSchema = new mongoose.Schema({
  title:{type: String, required:true, unique: true },
  content:{type: String, required:true, unique: true },
  islive:{type: Boolean, required :true, default:false},
  user:{type: mongoose.Types.ObjectId, required :true, ref: 'user'}
},{timestamps:true})

const Blog = mongoose.model('blog', BlogSchema);
module.exports = {Blog}
