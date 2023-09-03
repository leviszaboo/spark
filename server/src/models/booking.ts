import mongoose from "mongoose";

import { IBooking } from "../interfaces/interfaces";

const Schema = mongoose.Schema;

const BookingSchema = new Schema<IBooking>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }, 
  { timestamps: true }
)

export const Booking = mongoose.model('Booking', BookingSchema);