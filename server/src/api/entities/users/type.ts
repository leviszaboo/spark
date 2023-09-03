import { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID, 
  GraphQLInt,
  GraphQLScalarType,
  GraphQLObjectTypeConfig
} from "graphql";

import { Event } from "../../../models/event.ts";
import { EventType } from "../events/type.ts";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  description: "Information about a user.",
  fields: () => ({
    _id: {
      type: GraphQLNonNull(GraphQLID)
    },
    email: {
      type: GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLString
    },
    createdEvents: {
      type: GraphQLList(GraphQLNonNull(EventType)),
      resolve: async (user) => {
        try {
          const events = await Event.find({ creator: user._id });
          return events.map(event => ({ ...event }));
        } catch (err) {
          throw err;
        }
      }
    }
  })
})

export const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  description: "Input type to create a new user",
  fields: () => ({
    email: {
      type: GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
})

export const AuthDataType = new GraphQLObjectType({
  name: "AuthData",
  description: "Data returned on login.",
  fields: () => ({
    userId: { 
      type: GraphQLNonNull(GraphQLID)
    },
    token: {
      type: GraphQLNonNull(GraphQLString)
    },
    tokenExpiration: {
      type: GraphQLNonNull(GraphQLInt)
    }
  })
})