import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  description: string;
  dayOfWeek: string;
  userId: string;
}

const eventSchema = new Schema<IEvent>({
  description: { type: String, required: true },
  dayOfWeek: { type: String, enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'], required: true },
  userId: { type: String, required: true }
});

const Event = mongoose.model<IEvent>('Event', eventSchema);
export default Event;
