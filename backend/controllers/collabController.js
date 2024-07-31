import Collab from '../models/collabModel.js';

// @desc    Create a new collaborator
// @route   POST /api/collabs
// @access  Private
export const createCollab = async (req, res) => {
    console.log('Request Body:', req.body);
  try {
    const newCollab = await Collab.create(req.body);
    res.status(201).json(newCollab);
  } catch (error) {
    console.error('Error creating collaborator:', error);  // Detailed error logging
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ message: 'Validation Error', errors });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

// @desc    Get all collaborators
// @route   GET /api/collabs
// @access  Private
export const getCollabs = async (req, res) => {
  try {
    const collabs = await Collab.find();
    res.json(collabs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get a single collaborator by ID
// @route   GET /api/collabs/:id
// @access  Private
export const getCollab = async (req, res) => {
  try {
    const collab = await Collab.findById(req.params.id);
    if (!collab) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }
    res.json(collab);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a collaborator by ID
// @route   PUT /api/collabs/:id
// @access  Private
export const updateCollab = async (req, res) => {
  try {
    const updatedCollab = await Collab.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCollab) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }
    res.json(updatedCollab);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a collaborator by ID
// @route   DELETE /api/collabs/:id
// @access  Private
export const deleteCollab = async (req, res) => {
  try {
    const deletedCollab = await Collab.findByIdAndDelete(req.params.id);
    if (!deletedCollab) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }
    res.json({ message: 'Collaborator deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
