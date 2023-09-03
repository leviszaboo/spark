import { User } from "../../../models/user.ts";
import { Event } from "../../../models/event.ts";

export async function getEvents() { 
  try {
    const events = await Event.find().populate('creator');
    return events.map(event => ({ ...event._doc }));
  } catch (err) {
    throw err;
  }
}

export async function createEvent(_: any, args: any, context: any) {
  if (!context.req.isAuth) {
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
      creator: context.req.userId
    });

    const savedEvent = await event.save();
    const user = await User.findById(context.req.userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.createdEvents.push(savedEvent.id);
    await user.save();

    return savedEvent;
  } catch (err) {
    throw err;
  }
}