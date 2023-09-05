import { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID, 
  GraphQLInt,
} from "graphql";

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
