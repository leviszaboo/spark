import { 
  GraphQLSchema,
  GraphQLObjectType
} from "graphql"
import { EventQuery } from "./entities/events/query.js"
import { EventMutation } from "./entities/events/mutation.js"
import { UserMutation } from "./entities/users/mutations.js"

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    events: {
      type: EventQuery,
      description: EventQuery.description,
      resolve: () => { return {} }
    }
  }),
})

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    events: {
      type: EventMutation,
      description: EventMutation.description,
      resolve: () => { return {} }
    },
    users: {
      type: UserMutation,
      description: UserMutation.description,
      resolve: () => ({})
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

export default schema;