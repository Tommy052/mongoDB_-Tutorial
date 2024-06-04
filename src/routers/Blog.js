const { Router } = require('express');
const blogRouter = Router();
const { Blog } = require('../models/Blog');
const {User} = require("../models/User")
const mongoose = require('mongoose');

blogRouter.post('/', async(req,res) => {
  try{
    const {title, context,islive, userid} = req.body;
    console.log(title);
    if(typeof title !== "string") return res.status(400).send({err: "title is required!!!"})
    if(typeof context !== "string") return res.status(400).send({err: "context is required"})
    if(islive && islive !== "Boolean") return res.status(400).send({err: "islive is required"})
    if(!mongoose.isValidObjectId(userid)) return res.status(400).send({ error: 'error!!!!!' });
    const user = await User.findById(userid);
    if(!user) return res.status(400).send({err: "user is required"})

    const blog = new Blog({...req.body, user})
    await blog.save();
    return res.send({blog})
  }catch(err){
    return res.status(500).send({err : err.message})
  }
})

blogRouter.get('/', async(req,res) => {
  try{
    const blogs = await Blog.find({})

    return res.send({blogs})
  }catch(err){
    res.status(500).send({err : err.message})
  }
})

blogRouter.get('/:blogid', async(req,res) => {
  try{
    const {blogid} = req.params;
    console.log(blogid)
    if (!mongoose.isValidObjectId(blogid))
      return res.status(400).send({ error: 'error!!!!!' });
    const blog = await Blog.findOne({_id:blogid})
    return res.send({blog})
  }catch(err){
    res.status(500).send({err : err.message})
  }
})

blogRouter.put('/:blogid', async(req,res) => {
  try{
    const {blogid} = req.params;
    if (!mongoose.isValidObjectId(blogid))
      return res.status(400).send({ error: 'error!!!!!' });
    const {title, context} = req.body;
    if(typeof title !== "string") return res.status(400).send({err: "title is required!!!"})
    if(typeof context !== "string") return res.status(400).send({err: "context is required"})
    
    const blog = await Blog.findOneAndUpdate(
      {_id:blogid},
      {title,context},
      {new : true}
    )
    return res.send({blog})
  }catch(err){
    res.status(500).send({err : err.message})
  }
})

blogRouter.patch('/:blogid/live', async(req,res) => {
  try{
    const {blogid} = req.params;
    console.log(blogid)
    if (!mongoose.isValidObjectId(blogid))
      return res.status(400).send({ error: 'error!!!!!' });
    const {islive} = req.body;
    if(typeof islive !== "boolean") return res.status(400).send({err: "islive is required!!!"})

    const blog = await Blog.findOneAndUpdate(
      {_id:blogid},
      {islive},
      {new : true}
    )
      return res.send({blog})
  }catch(err){
    res.status(500).send({err : err.message})
  }
})

blogRouter.delete('/', async(req,res) => {
  try{

  }catch(err){
    res.status(500).send({err : err.message})
  }
})
module.exports = { blogRouter };