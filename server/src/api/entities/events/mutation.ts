import { GraphQLFieldConfig, GraphQLObjectType } from "graphql";

import { EventType, EventInputType } from "./type.ts";
import { createEvent } from "./resolvers.ts";


const CreateEvent: GraphQLFieldConfig<any, any, any> = {
  type: EventType,
  description: "Create a new event",
  args: {
    eventInput: {
      type: EventInputType
    }
  },
  resolve: (_, args, context) => {
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
