import Group from '../models/Group.js';

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(groups);
  } catch (err) {
    console.error("Server Error [GET /groups]:", err);
    res.status(500).json({ message: err.message });
  }
};

export const createGroup = async (req, res) => {
  const { name, members } = req.body;
  const group = new Group({ name, members, user: req.user._id });

  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  } catch (err) {
    console.error("Server Error [POST /groups]:", err);
    res.status(400).json({ message: err.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const result = await Group.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.json({ message: 'Group deleted' });
  } catch (err) {
    console.error("Server Error [DELETE /groups]:", err);
    res.status(500).json({ message: err.message });
  }
};