import { 
  GraphQLID,
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
