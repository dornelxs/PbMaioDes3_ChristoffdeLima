import Joi from 'joi';
import { registerSchema, loginSchema } from '../validators/authValidators';

describe('Validation Schemas', () => {
  describe('registerSchema', () => {
    it('should validate a correct registration payload', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1990-01-01',
        city: 'Cityville',
        country: 'Countryland',
        email: 'john.doe@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const { error } = registerSchema.validate(validData);
      if (error) {
        throw new Error(`Validation failed: ${error.message}`);
      }
      expect(error).toBeUndefined();
    });

    it('should invalidate missing required fields', () => {
      const invalidData = {
        firstName: '',
        lastName: '',
        birthDate: '',
        city: '',
        country: '',
        email: '',
        password: '',
        confirmPassword: '',
      };

      const { error } = registerSchema.validate(invalidData);
      if (!error) {
        throw new Error('Validation should have failed');
      }
      expect(error.details[0].message).toBe('The firstName is required!');
      
    });

    it('should invalidate incorrect password confirmation', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1990-01-01',
        city: 'Cityville',
        country: 'Countryland',
        email: 'john.doe@example.com',
        password: 'password123',
        confirmPassword: 'differentpassword',
      };

      const { error } = registerSchema.validate(invalidData);
      if (!error) {
        throw new Error('Validation should have failed');
      }
      expect(error.details[0].message).toBe('Passwords do not match');
    });
  });

  describe('loginSchema', () => {
    it('should validate a correct login payload', () => {
      const validData = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const { error } = loginSchema.validate(validData);
      if (error) {
        throw new Error(`Validation failed: ${error.message}`);
      }
      expect(error).toBeUndefined();
    });

    it('should invalidate missing required fields', () => {
      const invalidData = {
        email: '',
        password: '',
      };

      const { error } = loginSchema.validate(invalidData);
      if (!error) {
        throw new Error('Validation should have failed');
      }
      expect(error.details[0].message).toBe('The email is required!');
    });

    it('should invalidate incorrect email format', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };

      const { error } = loginSchema.validate(invalidData);
      if (!error) {
        throw new Error('Validation should have failed');
      }
      expect(error.details[0].message).toBe('Invalid email format');
    });
  });
});
