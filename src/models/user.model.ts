import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: number;
  photoURL: string;
}

export interface IUser extends UserInput, mongoose.Document {
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    isEmailVerified: { type: Boolean, default: false },
    userType: { type: Number, required: true },
    photoURL: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUser;
  return await bcrypt.compare(candidatePassword, user.password).catch(() => {
    return false;
  });
};

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
