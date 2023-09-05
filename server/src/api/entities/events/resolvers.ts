import { User } from "../../../models/user.ts";
import { Event } from "../../../models/event.ts";
import { EventInput } from "../../../interfaces/interfaces.ts";

export async function getEvents() { 
  try {
    const events = await Event.find().populate('creator');
    return events.map(event => {
      return event
    });
  } catch (err) {
    throw err;
  }
}

export async function createEvent(_: any, {title, description, price, date}: EventInput, context: any) {
  if (!context.req.isAuth) {
    throw new Error("Unauthenticated")
  }

  try {
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

    user.createdEvents.push(savedEvent);
    await user.save();

    return { ...savedEvent._doc, creator: user};
  } catch (err) {
    throw err;
  }
}