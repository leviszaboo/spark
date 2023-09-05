import { BookingInput, CancelBookingInput } from "../../../interfaces/interfaces.ts";
import { Booking } from "../../../models/booking.ts"
import { Event } from "../../../models/event.ts";
import { User } from "../../../models/user.ts";

export async function bookEvent(_: any, { eventId }: BookingInput, context: any) {
  if (!context.req.isAuth) {
    throw new Error("Unauthenticated")
  }

  const event = await Event.findById(eventId)

  if (!event) {
    throw new Error("Event doesn't exist.")
  }

  try {
    const booking = new Booking({
      user: context.req.userId,
      event: event._id
    });
    const result = await booking.save();
    const user = await User.findById(booking.user)

    return { 
      ...result,
      event: event.populate('creator'),
      user: user,
      createdAt: new Date(result.createdAt).toISOString(),
      updatedAt: new Date(result.updatedAt).toISOString()   
    }
  } catch(err) {
    throw err
  }
}

export async function cancelBooking(_: any, { bookingId } : CancelBookingInput, context: any) {
  if (!context.req.isAuth) {
    throw new Error("Unauthenticated")
  }

  try { 
    const booking = await Booking.findById(bookingId);
  
    if (!booking) {
      throw new Error("Booking not found")
    }

    const event = Event.findById(booking.event)

    await Booking.findByIdAndDelete(bookingId);
    return { ...event }
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