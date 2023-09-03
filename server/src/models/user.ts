import mongoose from "mongoose";

import { IUser } from "../interfaces/interfaces";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
})

export const User = mongoose.model('User', UserSchema);