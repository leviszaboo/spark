import { Types } from "mongoose"

interface DocumentResult<T> {
  _doc: T;
}
  
export interface IEvent extends DocumentResult<IEvent> {
  _id: Types.ObjectId
  title: string,
  description: string,
  price: number,
  date: string,
  creator: Types.ObjectId
}

export interface IBooking extends DocumentResult<IBooking> {
  _id: Types.ObjectId
  event: Types.ObjectId,
  user: Types.ObjectId,
  createdAt: Date,
  updatedAt: Date
}

export interface IUser extends DocumentResult<IUser> {
  _id: Types.ObjectId
  email: string,
  password: string,
  createdEvents: IEvent[]
}

export interface UserInput {
  email: string, 
  password: string
}

export interface EventInput {
  title: string, 
  description: string,
  price: number,
  date: string
}

export interface BookingInput {
  eventId: string,
}
  
export interface CancelBookingInput {
  bookingId: string,
}
