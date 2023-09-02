import { GraphQLObjectType } from "graphql";

import { EventType, EventInputType } from "./type.js";
import { createEvent } from "./resolvers.js";


const CreateEvent = {
  type: EventType,
  name: "CreateEvent",
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
