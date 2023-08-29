const express = require('express');
const { createYoga } = require('graphql-yoga')
const { 
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    events: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
      resolve: () => ["Cooking", "Cruising", "Biking"]
    }
  }),
})

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    createEvent: {
      type: GraphQLString,
      description: "Create a new event",
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve: (args) => args.name
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

app.listen({port: 3000});