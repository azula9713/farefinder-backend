import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { IUser } from './user.model';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10);

export interface HomePageLocationInput {
  createdBy: IUser['_id'];
  updatedBy: IUser['_id'];
  locationName: string;
}

export interface IHomePageLocation extends HomePageLocationInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const homePageLocationSchema = new mongoose.Schema(
  {
    locationNameId: {
      type: String,
      default: () => `loc_home_${nanoid()}`,
      unique: true,
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    locationName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const HomePageLocationModel = mongoose.model<IHomePageLocation>('HomePageLocation', homePageLocationSchema);

export default HomePageLocationModel;
