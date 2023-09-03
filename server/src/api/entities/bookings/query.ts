import { 
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
 } from "graphql";
import { getBookings } from "./resolvers.ts";
import { BookingType } from "./type.ts";

const GetBookings = {
  type: GraphQLNonNull(GraphQLList(GraphQLNonNull(BookingType))),
  description: "Query all bookings",
  resolve: async () => {
    const bookings = await getBookings();
    console.log(bookings)
    return bookings
  }
}

export const BookingQuery = new GraphQLObjectType({
  name: "BookingQuery",
  description: "The root booking query",
  fields: () => ({
    get: GetBookings
  })
})