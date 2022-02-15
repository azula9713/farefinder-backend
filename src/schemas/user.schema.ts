import { object, string, number, TypeOf } from 'zod';

const createUserSchema = object({
  body: object({
    firstName: string({ required_error: 'First name is required' }),
    lastName: string({ required_error: 'Last name is required' }),
    password: string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters'),
    confirmPassword: string({ required_error: 'Confirm password is required' }),
    email: string({ required_error: 'Email is required' }).email('Email is invalid'),
    photoURL: string({ required_error: 'Photo URL is required' }),
    userType: number({ required_error: 'User type is required', invalid_type_error: 'User type must be a number' }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password must match',
    path: ['confirmPassword'],
  }),
});

export type CreateUserType = Omit<TypeOf<typeof createUserSchema>, 'body.confirmPassword'>;

export default createUserSchema;
