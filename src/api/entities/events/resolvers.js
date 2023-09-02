import { User } from "../../../models/user.js";
import { Event } from "../../../models/event.js";

export async function getEvents() { 
  try {
    const events = await Event.find().populate('creator');
    return events.map(event => ({ ...event._doc }));
  } catch (err) {
    throw err;
  }
}

export async function createEvent(_, args, context) {
  if (!context.isAuth) {
    throw new Error("Unauthenticated")
  }

  try {
    const {
      title,
      description,
      date,
      price,
    } = args.eventInput

    const event = new Event({
      title,
      description,
      price: +price,
      date,
      creator: "64ee6c2fa48a82b53729cbc1"
    });

    const savedEvent = await event.save();
    const user = await User.findById("64ee6c2fa48a82b53729cbc1");

    if (!user) {
      throw new Error("User not found");
    }

    user.createdEvents.push(savedEvent);
    await user.save();

    return savedEvent;
  } catch (err) {
    throw err;
  }
}