import express from "express";
import { createYoga } from "graphql-yoga";
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLInputObjectType
} from "graphql"
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { Event } from "./models/event.js";

const app = express();

app.use(bodyParser.json());

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    _id: {
      type: GraphQLNonNull(GraphQLString)
    },
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
  })
})

const EventInputType = new GraphQLInputObjectType({
  name: "EventInput",
  description: "Input type to create a new event",
  fields: () => ({
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
  })
})

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    events: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(EventType))),
      resolve: async () => { 
        return Event
          .find()
          .then((events) => {
            return events.map((event) => {
              return {...event._doc}
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }),
})

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    createEvent: {
      type: EventType,
      description: "Create a new event",
      args: {
        eventInput: {
          type: EventInputType
        }
      },
      resolve: (_, args) => {
        const {
          title,
          description,
          date,
          price,
        } = args.eventInput

        const event = new Event({
          title: title,
          description: description,
          price: +price,
          date: date
        });
        event
          .save()
          .then((result) => {
            return {...result._doc}
          })
          .catch((err) => {
            console.log(err)
          });
        return event
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.all('/graphql', createYoga({ 
  schema: schema,
  graphiql: true
})); 

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER
  }:${process.env.MONGO_PASSWORD
  }@cluster0.kvn17mp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
  app.listen({port: 3000});
}).catch((err) => {
   console.log(err)
})