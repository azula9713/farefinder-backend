import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { IUser } from './user.model';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10);

export interface HotelScriptInput {
  createdBy: IUser['_id'];
  updatedBy: IUser['_id'];
  scriptSource: string;
  hotelName: string;
  isActive: boolean;
}

export interface IHotelScript extends HotelScriptInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const hotelScriptSchema = new mongoose.Schema(
  {
    hotelScriptId: {
      type: String,
      default: () => `hotel_script_${nanoid()}`,
      unique: true,
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    scriptSource: { type: String, required: true },
    hotelName: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const HotelScriptModel = mongoose.model<IHotelScript>('HotelScript', hotelScriptSchema);

export default HotelScriptModel;
