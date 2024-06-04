const { Router } = require('express');
const commentRouter = Router({mergeParams:true});
const {Comment} = require('../models/Comment');
const { Blog } = require('../models/Blog');
const {User} = require("../models/User")
const mongoose = require('mongoose');
/* 
  /user 
  /blog
  /blog/:blog/comment
*/
commentRouter.post('/',async(req,res)=>{
  try{
    const {blogid} = req.params;
    const {content,userid} = req.body;
    if(!mongoose.isValidObjectId(blogid)) return res.status(400).send({err: "blogId is invalid"});
    if(!mongoose.isValidObjectId(userid)) return res.status(400).send({err: "userid is invalid"});
    if(typeof content !== "string") return res.status(400).send({err: "context is required!!!"});

    const [blog,user] = await Promise.all([
      await Blog.findByIdAndUpdate(blogid),
      await User.findByIdAndUpdate(userid)
    ])
    if(!blog || !user) return res.status(400).send({err:"err!!!!"})
    if(!blog.islive) return res.status(400).send({err:"islive false!!!!"})
    const comment = new Comment({content, user,blog})
    comment.save();
    return res.send({comment})
  }catch(err){
    return res.status(400).send({err: err.message})
  }

 
})

commentRouter.get('/', async(req,res)=> {
  const {blogid} = req.params;
  if(!mongoose.isValidObjectId(blogid)) return res.status(400).send({err: "blogId is invalid"});

  const comments = await Comment.find({blog:blogid});
  return res.send({comments})
})


module.exports = { commentRouter };