import { GraphQLObjectType } from "graphql";

import { EventType, EventInputType } from "./type.js";
import { createEvent } from "./resolvers/mutationsResolvers.js";


const CreateEvent = {
  type: EventType,
  name: "CreateEvent",
  description: "Create a new event",
  args: {
    eventInput: {
      type: EventInputType
    }
  },
  resolve: (_, args) => {
    return createEvent(_, args)
  }
}

export const EventMutation = new GraphQLObjectType({
  name: 'EventMutation',
  description: 'The root event mutation.',
  fields: {
    create: CreateEvent
  }
})
