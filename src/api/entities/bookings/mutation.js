import { GraphQLObjectType } from "graphql";
import { bookEvent, cancelBooking } from "./resolvers/mutationResolvers.js";
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
  resolve: (_, args) => {
    return bookEvent(_, args);
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
  resolve: (_, args) => {
    return cancelBooking(_, args);
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