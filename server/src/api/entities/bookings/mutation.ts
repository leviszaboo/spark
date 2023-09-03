import { GraphQLFieldConfig, GraphQLObjectType } from "graphql";
import { bookEvent, cancelBooking } from "./resolvers.ts"
import { BookingInputType, BookingType, CancelBookingInputType } from "./type.ts";
import { EventType } from "../events/type.ts";

const BookEvent: GraphQLFieldConfig<any, any, any> = {
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

const CancelEvent: GraphQLFieldConfig<any, any, any> = {
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