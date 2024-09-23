import express from 'express';
import {  getCollaboratorStats,
  createCollab,
  getCollabs,
  getCollab,
  updateCollab,
  deleteCollab,

} from '../controllers/collabController.js';

const router = express.Router();

router.get('/stats', getCollaboratorStats);

router.post('/', createCollab);

router.get('/', getCollabs);

router.get('/:id', getCollab);

router.put('/:id', updateCollab);

router.delete('/:id', deleteCollab);


export default router;