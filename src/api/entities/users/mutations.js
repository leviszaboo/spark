import { GraphQLObjectType } from "graphql";

import { UserType, UserInputType } from "./type.js";
import { createUser } from "./resolvers.js";

const CreateUser = {
  name: 'CreateUser',
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