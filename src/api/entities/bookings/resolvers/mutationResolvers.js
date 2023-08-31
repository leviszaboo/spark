import { Booking } from "../../../../models/booking.js"
import { Event } from "../../../../models/event.js";
import { User } from "../../../../models/user.js";

export async function bookEvent(_, args) {
  const eventId = args.bookingInput.eventId
  const fetchedEvent = await Event.findById(eventId)

  if (!fetchedEvent) {
    throw new Error("Event doesn't exist.")
  }

  try {
    const booking = new Booking({
      user: "64ee6c2fa48a82b53729cbc1",
      event: fetchedEvent
    });
    const result = await booking.save();
    const user = await User.findById(booking.user)
    return { 
      ...result._doc,
      user: user,
      createdAt: new Date(result.createdAt).toISOString(),
      updatedAt: new Date(result.updatedAt).toISOString()   
    }
  } catch(err) {
    throw err
  }
}

export async function cancelBooking(_, args) {
  try { 
    const bookingId = args.cancelBookingInput.bookingId;
    const booking = await Booking.findById(bookingId).populate('event');
  
    if (!booking) {
      throw new Error("Booking not found")
    }

    const event = {
      ...booking.event._doc
    }

    await Booking.findByIdAndDelete(bookingId);
    return event
  } catch(err) {
    throw err
  }
}