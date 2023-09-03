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
import { IUser } from "../../../interfaces/interfaces.ts";
import { getCreatedEvents } from "./resolvers.ts";

export const UserType: GraphQLObjectType<any, any> = new GraphQLObjectType({
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
      resolve: (user: IUser) => {
        return getCreatedEvents(user)
      }
    }
  })
})

export const UserInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
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

export const AuthDataType: GraphQLObjectType<any, any>  = new GraphQLObjectType({
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
