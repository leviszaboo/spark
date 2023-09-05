import { GraphQLFieldConfig, GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

import { UserType } from "./type.ts";
import { createUser } from "./resolvers.ts";

const CreateUser: GraphQLFieldConfig<any, any, any> = {
  description: "Create a new user",
  type: UserType,
  args: {
    email: {
      type: GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (_, args) => {
    return createUser(_, args);
  }
}

export const UserMutation = new GraphQLObjectType({
  name: 'UserMutation',
  description: 'The root user mutation.',
  fields: () => ({
    create: CreateUser
  })
})