import { Request, Response } from 'express';
import User from '../models/User';

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
