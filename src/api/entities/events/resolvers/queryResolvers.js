import { Event } from "../../../../models/event.js";

export async function getEvents() { 
  try {
    const events = await Event.find().populate('creator');
    return events.map(event => ({ ...event._doc }));
  } catch (err) {
    throw err;
  }
}