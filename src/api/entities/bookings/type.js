import { 
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull, 
  GraphQLObjectType, 
  GraphQLString
} from "graphql";
import { EventType } from "../events/type.js";
import { UserType } from "../users/type.js";

export const BookingType = new GraphQLObjectType({
  name: "Booking",
  description: "Booking",
  fields: () => ({
    _id: {
      type: GraphQLNonNull(GraphQLID)
    },
    event: {
      type: GraphQLNonNull(EventType)
    },
    user: {
      type: GraphQLNonNull(UserType)
    },
    createdAt: {
      type: GraphQLNonNull(GraphQLString)
    },
    updatedAt: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
})

export const BookingInputType = new GraphQLInputObjectType({
  name:"BookingInput",
  description: "Input to book an event",
  fields: () => ({
    eventId: {
      type: GraphQLNonNull(GraphQLString),
    }
  })
})

export const CancelBookingInputType = new GraphQLInputObjectType({
  name:"CancelBookingInput",
  description: "Input to cancel a booking",
  fields: () => ({
    bookingId: {
      type: GraphQLNonNull(GraphQLString),
    }
  })
})