import express from "express";
import { createYoga } from "graphql-yoga";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { authenticate } from "./middleware/authMiddleware.js";
import schema from "./api/schema.js"

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  authenticate(req, res, next)
})

app.use('/graphql', createYoga({ 
  schema: schema,
  context({ request }) {
    return { ...request }
  },
  graphiql: true
})); 

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER
  }:${process.env.MONGO_PASSWORD
  }@cluster0.kvn17mp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
  app.listen({port: 3000}, () => {
    console.log("server running on: http://localhost:3000/graphql")
  });
}).catch((err) => {
   console.log(err)
})