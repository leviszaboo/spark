import { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLID
} from "graphql"

import { UserType } from "../users/type.ts"

export const EventType = new GraphQLObjectType({
  name: "Event",
  description: "Information about an event.",
  fields: () => ({
    _id: {
      type: GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLNonNull(GraphQLString)
    },
    price: {
      type: GraphQLNonNull(GraphQLFloat)
    },
    date: {
      type: GraphQLNonNull(GraphQLString)
    },
    creator: {
      type: GraphQLNonNull(UserType)
    }
  })
})

export const EventInputType = new GraphQLInputObjectType({
  name: "EventInput",
  description: "Input type to create a new event",
  fields: () => ({
    title: {
      type: GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLNonNull(GraphQLString)
    },
    price: {
      type: GraphQLNonNull(GraphQLFloat)
    },
    date: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
})
