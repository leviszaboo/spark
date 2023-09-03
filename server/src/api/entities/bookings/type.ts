import { 
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull, 
  GraphQLObjectType, 
  GraphQLString
} from "graphql";
import { EventType } from "../events/type.ts";
import { UserType } from "../users/type.ts";

export const BookingType: GraphQLObjectType<any, any>  = new GraphQLObjectType({
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

export const BookingInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name:"BookingInput",
  description: "Input to book an event",
  fields: () => ({
    eventId: {
      type: GraphQLNonNull(GraphQLString),
    }
  })
})

export const CancelBookingInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name:"CancelBookingInput",
  description: "Input to cancel a booking",
  fields: () => ({
    bookingId: {
      type: GraphQLNonNull(GraphQLString),
    }
  })
})