import { Booking } from "../../../../models/booking.js"
import { Event } from "../../../../models/event.js";

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