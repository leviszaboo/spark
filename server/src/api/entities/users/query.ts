import { 
  GraphQLFieldConfig,
    GraphQLNonNull,
    GraphQLObjectType
  } from "graphql";
  
import { AuthDataType, UserInputType } from "./type.ts";
import { login } from "./resolvers.ts";

const Login: GraphQLFieldConfig<any, any, any> = {
  description: "Log in a user",
  type: GraphQLNonNull(AuthDataType),
  args: {
    userInput: {
      type: UserInputType
    }
  },
  resolve: (_, args) => {
    return login(_, args);
  }
}

export const UserQuery = new GraphQLObjectType({
  name: "UserQuery",
  description: "The root user query",
  fields: () => ({
    login: Login
  })
})