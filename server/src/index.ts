import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { join } from "path";
import db from "./db";

async function start(): Promise<void> {
	await db.initialize();

	const schema = await buildSchema({
		resolvers: [join(__dirname, "/resolvers/*.ts")],
	});

	const server = new ApolloServer({
		schema,
		csrfPrevention: true,
		cache: "bounded",
		plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
	});

	await server.listen().then(({ url }: { url: string }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
}

start().catch(console.error);
