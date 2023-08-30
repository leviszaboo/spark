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
import bcrypt from "bcryptjs"

import { Event } from "./models/event.js";
import { User } from "./models/user.js";

const app = express();

app.use(bodyParser.json());

const UserType = new GraphQLObjectType({
  name: "User",
  description: "Information about a user.",
  fields: () => ({
    _id: {
      type: GraphQLNonNull(GraphQLString)
    },
    email: {
      type: GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLString
    },
    createdEvents: {
      type: GraphQLList(GraphQLNonNull(EventType)),
      resolve: async (user) => {
        try {
          const events = await Event.find({ creator: user._id });
          return events.map(event => ({ ...event._doc }));
        } catch (err) {
          throw err;
        }
    }
    }
  })
})

const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  description: "Input type to create a new user",
  fields: () => ({
    email: {
      type: GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
})

const EventType = new GraphQLObjectType({
  name: "Event",
  description: "Information about an event.",
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
    },
    creator: {
      type: GraphQLNonNull(UserType)
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
        try {
          const events = await Event.find().populate('creator');
          return events.map(event => ({ ...event._doc }));
        } catch (err) {
          throw err;
        }
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
      name: "CreateEvent",
      description: "Create a new event",
      args: {
        eventInput: {
          type: EventInputType
        }
      },
      resolve: async (_, args) => {
        try {
          const {
            title,
            description,
            date,
            price,
          } = args.eventInput

          const event = new Event({
            title,
            description,
            price: +price,
            date,
            creator: "64ee6c2fa48a82b53729cbc1"
          });

          const savedEvent = await event.save();
          const user = await User.findById("64ee6c2fa48a82b53729cbc1");
    
          if (!user) {
            throw new Error("User not found");
          }
    
          user.createdEvents.push(savedEvent);
          await user.save();
    
          return savedEvent;
        } catch (err) {
          throw err;
        }
      }
    },
    createUser: {
      type: UserType,
      name: 'CreateUser',
      description: "Create a new user",
      args: {
        userInput: {
          type: UserInputType
        }
      },
      resolve: async (_, args) => {
        try {
          const {
            email,
            password
          } = args.userInput;

          const existingUser = await User.findOne({ email });

          if (existingUser) {
            throw new Error("User already exists.");
          }

          const hashedPassword = await bcrypt.hash(password, 12);

          const user = new User({
            email,
            password: hashedPassword
          });

          const savedUser = await user.save();

          return { ...savedUser._doc, password: null };
        } catch (err) {
          throw err;
        }
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

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER
  }:${process.env.MONGO_PASSWORD
  }@cluster0.kvn17mp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
  app.listen({port: 3000});
}).catch((err) => {
   console.log(err)
})