import { 
  GraphQLSchema,
  GraphQLObjectType
} from "graphql"
import { EventQuery } from "./entities/events/query.js"
import { EventMutation } from "./entities/events/mutation.js"
import { UserQuery } from "./entities/users/query.js"
import { UserMutation } from "./entities/users/mutations.js"
import { BookingMutation } from "./entities/bookings/mutation.js"
import { BookingQuery } from "./entities/bookings/query.js"

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    events: {
      type: EventQuery,
      description: EventQuery.description,
      resolve: () => ({})
    },
    users: {
      type: UserQuery,
      description: UserQuery.description,
      resolve: () => ({})
    },
    bookings: {
      type: BookingQuery,
      description: BookingQuery.description,
      resolve: () => ({})
    },
  }),
})

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    events: {
      type: EventMutation,
      description: EventMutation.description,
      resolve: () => ({})
    },
    users: {
      type: UserMutation,
      description: UserMutation.description,
      resolve: () => ({})
    },
    bookings: {
      type: BookingMutation,
      description: BookingMutation.description,
      resolve: () => ({})
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

export default schema;