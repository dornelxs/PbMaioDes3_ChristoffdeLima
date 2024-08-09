import request from 'supertest';
import express from 'express';
import { createEvent, getEvents, getEventById, deleteEventById, deleteEventsByDay } from '../controllers/eventController';
import Event from '../models/Event';


const app = express();
app.use(express.json());


app.post('/events', createEvent);
app.get('/events', getEvents);
app.get('/events/:id', getEventById);
app.delete('/events/:id', deleteEventById);
app.delete('/events', deleteEventsByDay);


jest.mock('../models/Event');

describe('Event Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

describe('POST /events', () => {
    it('should create a new event', async () => {
        const mockEvent = { description: 'Test Event', dayOfWeek: 'monday', userId: '123' };

        (Event.prototype.save as jest.Mock).mockResolvedValue(mockEvent);

        const response = await request(app).post('/events').send(mockEvent);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Event created successfully');
        expect(response.body.event).toMatchObject(mockEvent);
        });

    it('should return validation error for invalid data', async () => {
        const invalidEvent = { description: '', dayOfWeek: 'invalidDay', userId: '123' };

        const response = await request(app).post('/events').send(invalidEvent);

        expect(response.status).toBe(422);
        expect(response.body.error).toBe('Validation Error');
    });
});

describe('GET /events', () => {
    it('should return a list of events', async () => {
        const mockEvents = [
            { description: 'Event 1', dayOfWeek: 'monday', userId: '123' },
            { description: 'Event 2', dayOfWeek: 'tuesday', userId: '456' },
        ];

        (Event.find as jest.Mock).mockResolvedValue(mockEvents);

        const response = await request(app).get('/events');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockEvents);
    });
});

describe('GET /events/:id', () => {
    it('should return an event by ID', async () => {
        const mockEvent = { description: 'Test Event', dayOfWeek: 'monday', userId: '123' };

        (Event.findById as jest.Mock).mockResolvedValue(mockEvent);

        const response = await request(app).get('/events/123');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockEvent);
    });

    it('should return 404 if event is not found', async () => {
        (Event.findById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get('/events/123');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Event not found');
    });
});

describe('DELETE /events/:id', () => {
    it('should delete an event by ID', async () => {
        (Event.findByIdAndDelete as jest.Mock).mockResolvedValue({});

        const response = await request(app).delete('/events/123');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Event deleted successfully');
    });

    it('should return 404 if event is not found for deletion', async () => {
        (Event.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

        const response = await request(app).delete('/events/123');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Event not found');
    });
});

describe('DELETE /events', () => {
    it('should delete events by day of week', async () => {
        const mockEvents = [
            { description: 'Event 1', dayOfWeek: 'monday', userId: '123' },
            { description: 'Event 2', dayOfWeek: 'monday', userId: '456' },
        ];

        (Event.find as jest.Mock).mockResolvedValue(mockEvents);
        (Event.deleteMany as jest.Mock).mockResolvedValue({ deletedCount: mockEvents.length });

        const response = await request(app).delete('/events').query({ dayOfWeek: 'monday' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Events deleted successfully');
        expect(response.body.deletedEvents).toEqual(mockEvents);
    });

    it('should return 400 for invalid day of week', async () => {
        const response = await request(app).delete('/events').query({ dayOfWeek: 'invalidDay' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid day of week');
    });

    it('should return 404 if no events found for the specified day', async () => {
        (Event.find as jest.Mock).mockResolvedValue([]);

        const response = await request(app).delete('/events').query({ dayOfWeek: 'monday' });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No events found for the specified day');
        });
    });
});
