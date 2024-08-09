import { Router } from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  deleteEventById,
  deleteEventsByDay,
} from '../controllers/eventController';
import { checkToken } from '../middlewares/authMiddleware'; 

const router = Router();

router.post('/events', checkToken, createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventById);
router.delete('/events/:id', deleteEventById);
router.delete('/events/by-day', deleteEventsByDay);

export default router;
