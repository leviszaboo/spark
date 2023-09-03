import mongoose from "mongoose";

import { IEvent } from "../interfaces/interfaces";

const Schema = mongoose.Schema;

const eventSchema = new Schema<IEvent>({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
});

export const Event = mongoose.model("Event", eventSchema);