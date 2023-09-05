import { 
  GraphQLFieldConfig, 
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString 
} from "graphql";

import { 
  bookEvent, 
  cancelBooking 
} from "./resolvers.ts"
import { BookingType } from "./type.ts";
import { EventType } from "../events/type.ts";
import { 
  BookingInput, 
  CancelBookingInput 
} from "../../../interfaces/interfaces.ts";

const BookEvent: GraphQLFieldConfig<any, any, any> = {
  type: BookingType,
  description: "Book an event.",
  args: {
    eventId: {
      type: GraphQLNonNull(GraphQLString),
    }
  },
  resolve: (_, args: BookingInput, context) => {
    return bookEvent(_, args, context);
  }
}

const CancelEvent: GraphQLFieldConfig<any, any, any> = {
  type: EventType,
  description: "Book an event.",
  args: {
    bookingId: {
      type: GraphQLNonNull(GraphQLString),
    }
  },
  resolve: (_, args: CancelBookingInput, context) => {
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