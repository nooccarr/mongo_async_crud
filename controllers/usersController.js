// TODO: Create a users.js in routes and then API folder. And then allow some user information to be requested. Maybe getAllUsers and maybe deleteUser and set that up so that it can be accessed in route by admin only, such as ROLES_LIST.Admin because that's the user

// - Create Users API collections in Thunder Client
// - Check if getAllUsers, deleteUser, getUser is working as intended

const User = require('../model/User');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ 'message': 'No users found.' }); // no content
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req.body.id) return res.status(400).json({ 'message': 'Employee ID required.' });

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) return res.status(204).json({ 'message': `No employee matches ID ${req.body.id}` });

  const result = await User.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req.params.id) return res.status(400).json({ 'message': 'Employee ID required.' });

  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) return res.status(204).json({ 'message': `No employee matches ID ${req.params.id}.` });
  res.json(user);
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser
};
