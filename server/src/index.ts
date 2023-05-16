import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { join } from "path";
import datasource from "./db";
import jwt from "jsonwebtoken";
import express from "express";
import { env } from "./env";
import User from "./entity/User";
import cookie from "cookie";

export interface JWTPayload {
  userId: number;
}

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}

async function start(): Promise<void> {
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [join(__dirname, "/resolvers/*.ts")],
    validate: {
      forbidUnknownValues: false,
    },
    authChecker: async ({ context }: { context: ContextType }) => {
      const {
        req: { headers },
      } = context;
      const tokenInAuthHeaders = headers.authorization?.split(" ")[1];
      const tokenInCookie = cookie.parse(headers.cookie ?? "").token;

      const token = tokenInAuthHeaders ?? tokenInCookie;

      if (typeof token === "string") {
        const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY) as JWTPayload;
        if (typeof decoded === "object") {
          const currentUser = await datasource.getRepository(User).findOne({
            where: { id: decoded.userId },
            relations: {
              groups: true,
              createdGroups: true,
              createdEcoActions: true,
              relatedEcoActions: true,
              teams: true,
              friends: true,
              company: true,
              createdCompany: true,
            },
          });
          if (currentUser !== null) context.currentUser = currentUser;
          return true;
        }
      }
      return false;
    },
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context: ({ req, res }) => ({
      req,
      res,
    }),
    cors: {
      origin: env.CORS_ALLOWED_ORIGINS.split(","),
      credentials: true,
    },
  });

  await server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

start().catch(console.error);
