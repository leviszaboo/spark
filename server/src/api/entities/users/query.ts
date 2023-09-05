import { 
  GraphQLFieldConfig,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
  } from "graphql";
  
import { AuthDataType } from "./type.ts";
import { login } from "./resolvers.ts";
import { UserInput } from "../../../interfaces/interfaces.ts";

const Login: GraphQLFieldConfig<any, any, any> = {
  description: "Log in a user",
  type: GraphQLNonNull(AuthDataType),
  args: {
    email: {
      type: GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (_, args: UserInput) => {
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