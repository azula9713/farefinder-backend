import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { IUser } from './user.model';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10);

export interface PopularLocationInput {
  createdBy: IUser['_id'];
  updatedBy: IUser['_id'];
  locationTitle: string;
  locationImage: string;
  locationDescription: string;
  locationAirportCode: string;
  locationHotelCode: string;
  locationCarCode: string;
}

export interface IPopularLocation extends PopularLocationInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const popularLocationSchema = new mongoose.Schema(
  {
    locationId: {
      type: String,
      default: () => `pop_loc_${nanoid()}`,
      unique: true,
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    locationTitle: { type: String, required: true },
    locationImage: { type: String, required: true },
    locationDescription: { type: String, required: true },
    locationAirportCode: { type: String, required: true },
    locationHotelCode: { type: String, required: true },
    locationCarCode: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const PopularLocationModel = mongoose.model<IPopularLocation>('PopularLocation', popularLocationSchema);

export default PopularLocationModel;
