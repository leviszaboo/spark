import express from "express";
import { createYoga } from "graphql-yoga";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import schema from "./api/schema.js"

const app = express();

app.use(bodyParser.json());

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