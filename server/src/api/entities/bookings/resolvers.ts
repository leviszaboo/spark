import { Booking } from "../../../models/booking.ts"
import { Event } from "../../../models/event.ts";
import { User } from "../../../models/user.ts";

export async function bookEvent(_: any, args: any, context: any) {
  if (!context.req.isAuth) {
    throw new Error("Unauthenticated")
  }

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
      ...result,
      user: user,
      createdAt: new Date(result.createdAt).toISOString(),
      updatedAt: new Date(result.updatedAt).toISOString()   
    }
  } catch(err) {
    throw err
  }
}

export async function cancelBooking(_: any, args: any, context: any) {
  if (!context.req.isAuth) {
    throw new Error("Unauthenticated")
  }

  try { 
    const bookingId = args.cancelBookingInput.bookingId;
    const booking = await Booking.findById(bookingId).populate('event');
  
    if (!booking) {
      throw new Error("Booking not found")
    }

    const event = {
      ...booking.event
    }

    await Booking.findByIdAndDelete(bookingId);
    return event
  } catch(err) {
    throw err
  }
}

export async function getBookings() {
  try {
    const bookings = await Booking.find().populate('event').populate('user');

    return bookings.map((booking) => {
      return { 
        ...booking._doc, 
        createdAt: new Date(booking.createdAt).toISOString(),
        updatedAt: new Date(booking.updatedAt).toISOString()  
      }
    })
  } catch(err) {
    throw err
  }
}