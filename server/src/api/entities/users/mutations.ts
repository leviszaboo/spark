import { GraphQLFieldConfig, GraphQLObjectType } from "graphql";

import { UserType, UserInputType } from "./type.ts";
import { createUser } from "./resolvers.ts";

const CreateUser: GraphQLFieldConfig<any, any, any> = {
  description: "Create a new user",
  type: UserType,
  args: {
    userInput: {
      type: UserInputType
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