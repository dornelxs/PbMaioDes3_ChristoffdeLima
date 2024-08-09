import { Request, Response } from 'express';
import Event from '../models/Event';
import { createEventSchema, queryEventSchema } from '../validators/eventValidator';

const validateSchema = (schema: any, data: any, res: Response) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    return res.status(422).json({
      error: 'Validation Error',
      message: error.details.map((detail: any) => detail.message).join(', '),
    });
  }
  return null;
};

export const createEvent = async (req: Request, res: Response): Promise<Response> => {
  const validationError = validateSchema(createEventSchema, req.body, res);
  if (validationError) return validationError;

  const { description, dayOfWeek, userId } = req.body;

  try {
    const event = new Event({ description, dayOfWeek, userId });
    await event.save();
    return res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEvents = async (req: Request, res: Response): Promise<Response> => {
  const validationError = validateSchema(queryEventSchema, req.query, res);
  if (validationError) return validationError;

  const { dayOfWeek, description } = req.query;

  try {
    const query: any = {};
    if (dayOfWeek) query.dayOfWeek = dayOfWeek;
    if (description) query.description = { $regex: description, $options: 'i' };

    const events = await Event.find(query);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteEventById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const result = await Event.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteEventsByDay = async (req: Request, res: Response): Promise<Response> => {
  const { dayOfWeek } = req.query;

  try {
    if (!dayOfWeek || !['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].includes(dayOfWeek as string)) {
      return res.status(400).json({ message: 'Invalid day of week' });
    }

    const deletedEvents = await Event.find({ dayOfWeek }).lean();
    if (deletedEvents.length === 0) {
      return res.status(404).json({ message: 'No events found for the specified day' });
    }

    await Event.deleteMany({ dayOfWeek });

    return res.status(200).json({ message: 'Events deleted successfully', deletedEvents });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
