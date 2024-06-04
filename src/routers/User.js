const { Router } = require('express');
const userRouter = Router();
const { User } = require('../models/User');
const mongoose = require('mongoose');

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    return res.send({ users });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
userRouter.get('/:userid', async (req, res) => {
  const { userid } = req.params;
  if (!mongoose.isValidObjectId(userid))
    return res.status(400).send({ error: 'error!!!!!' });
  try {
    const user = await User.findOne({ _id: userid });
    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
userRouter.delete('/:userid', async (req, res) => {
  const { userid } = req.params;
  if (!mongoose.isValidObjectId(userid))
    return res.status(400).send({ error: 'error!!!!!' });
  try {
    const user = await User.findOneAndDelete({ _id: userid });
    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
userRouter.put('/:userid', async (req, res) => {
  const { userid } = req.params;
  if (!mongoose.isValidObjectId(userid))
    return res.status(400).send({ error: 'error!!!!!' });
  try {
    const { age } = req.body;
    if (!age) return res.status(400).send({ err: 'age is required' });
    const user = await User.findByIdAndUpdate(
      userid,
      { $set: { age } },
      { new: true }
    );
    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});
userRouter.post('/', async (req, res) => {
  try {
    const { username, name } = req.body;
    if (!username) return res.status(400).send({ err: 'username is required' });
    if (!name || !name.first || !name.last)
      return res
        .status(400)
        .send({ err: 'first and last name are is required' });
    const user = new User(req.body);
    await user.save();
    return res.send({ user });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = { userRouter };
