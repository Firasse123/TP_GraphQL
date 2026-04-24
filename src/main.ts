import { createServer } from "node:http";
import { createPubSub, createYoga } from "graphql-yoga";
import { createSchema } from "graphql-yoga";
import { Query } from "./resolvers/Query";
import { Skill } from "./resolvers/Skill";
import { User } from "./resolvers/User";
import { Cv } from "./resolvers/Cv";
import { Mutation } from "./resolvers/Mutation";
import { Subscription } from "./resolvers/Subscription";
import {prisma }    from "./db/db";

const pubSub = createPubSub();
const fs =require("fs");
const path=require("path");
type AppContext = {
    prisma: typeof prisma;
    pubSub: typeof pubSub;
};

const schema = createSchema<AppContext>({
    typeDefs: 
fs.readFileSync(path.join(__dirname, "schema", "schema.graphql"), "utf-8")
    ,
resolvers: {
    Query,
    Skill,
    User,
    Cv,
    Mutation,
    Subscription
},

});

const yoga = createYoga({schema,context: () => ({ prisma , pubSub })});
const server = createServer(yoga);
server.listen(4000, () => {
console.info(`
Server is running on
http://localhost:4000/graphql`
);
});