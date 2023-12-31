import { 
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType
} from "graphql";

import { EventType } from "./type.ts";
import { getEvents } from "./resolvers.ts";

const GetEvents = {
  type: GraphQLNonNull(GraphQLList(GraphQLNonNull(EventType))),
  resolve: () => {
    return getEvents();
  }
}

export const EventQuery = new GraphQLObjectType({
  name: "EventQuery",
  description: "The root event query.",
  fields: () => ({
    get: GetEvents
  })
})