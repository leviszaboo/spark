import { 
  GraphQLFieldConfig, 
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString, 
  GraphQLFloat
} from "graphql";

import { EventType } from "./type.ts";
import { createEvent } from "./resolvers.ts";
import { EventInput } from "../../../interfaces/interfaces.ts";


const CreateEvent: GraphQLFieldConfig<any, any, any> = {
  type: EventType,
  description: "Create a new event",
  args: {
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
  },
  resolve: (_, args: EventInput, context) => {
    return createEvent(_, args, context);
  }
}

export const EventMutation = new GraphQLObjectType({
  name: 'EventMutation',
  description: 'The root event mutation.',
  fields: () => ({
    create: CreateEvent
  })
})
