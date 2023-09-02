import { 
    GraphQLNonNull,
    GraphQLObjectType
  } from "graphql";
  
import { AuthDataType, UserInputType } from "./type.js";
import { login } from "./resolvers.js";

const Login = {
  name: "Login",
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