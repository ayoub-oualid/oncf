// planningRoutes.js
import express from 'express';
import {
  getPlannings,
  getPlanning,
  createPlanning,
  updatePlanning,
  deletePlanning,
  getPlanningsByUser
} from '../controllers/planningController.js';

const router = express.Router();

router.get('/', getPlannings);
router.get('/:id', getPlanning);
router.post('/', createPlanning);
router.put('/:id', updatePlanning);
router.delete('/:id', deletePlanning);
router.get('/user/:userId', getPlanningsByUser);

export default router;