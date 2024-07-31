
import Planning from '../models/planningModel.js';

export const getPlannings = async (req, res) => {
  try {
    const plannings = await Planning.find();
    res.status(200).json(plannings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPlanning = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id);
    if (!planning) return res.status(404).json({ message: 'Planning not found' });
    res.status(200).json(planning);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlanning = async (req, res) => {
  const planning = new Planning(req.body);
  try {
    const newPlanning = await planning.save();
    res.status(201).json(newPlanning);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePlanning = async (req, res) => {
  try {
    const updatedPlanning = await Planning.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPlanning) return res.status(404).json({ message: 'Planning not found' });
    res.json(updatedPlanning);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePlanning = async (req, res) => {
  try {
    const planning = await Planning.findByIdAndDelete(req.params.id);
    if (!planning) return res.status(404).json({ message: 'Planning not found' });
    res.json({ message: 'Planning deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlanningsByUser = async (req, res) => {
  try {
    const plannings = await Planning.find({ userId: req.params.userId });
    res.status(200).json(plannings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};