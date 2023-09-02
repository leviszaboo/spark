import { GraphQLObjectType } from "graphql";
import { bookEvent, cancelBooking } from "./resolvers.js"
import { BookingInputType, BookingType, CancelBookingInputType } from "./type.js";
import { EventType } from "../events/type.js";

const BookEvent = {
  type: BookingType,
  description: "Book an event.",
  args: {
    bookingInput: {
      type: BookingInputType
    }
  },
  resolve: (_, args, context) => {
    return bookEvent(_, args, context);
  }
}

const CancelEvent = {
  type: EventType,
  description: "Book an event.",
  args: {
    cancelBookingInput: {
      type: CancelBookingInputType
    }
  },
  resolve: (_, args, context) => {
    return cancelBooking(_, args, context);
  }
}

export const BookingMutation = new GraphQLObjectType({
  name: "BookingMutation",
  description: "The root booking mutation",
  fields: () => ({
    create: BookEvent,
    cancel: CancelEvent
  })
})