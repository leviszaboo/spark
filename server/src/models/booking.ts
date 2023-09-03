import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
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