import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  birthDate: Date;
  city: string;
  country: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
