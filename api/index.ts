import fastify from "fastify";
import { getMMI } from "../src/index";
import { readFile } from "fs";
import path from "path";
import { Drive } from "deta";

const drive = Drive("photos");
const app = fastify({ logger: true });

app.route({
  method: "GET",
  url: "/mmi",
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          value: { type: "number" },
          level: { type: "string" },
          picutrePath: { type: "string" },
          alertMessage: { type: "string" },
        },
      },
    },
  },
  handler: async () => {
    return await getMMI();
  },
});

app.route({
  method: "GET",
  url: "/image",
  handler: (request, reply) => {
    try {
      // @ts-ignore
      drive.get(request.query.file || "mmi.jpg").then(async (res) => {
        reply
          .code(200)
          .type(res?.type || "image/jpeg")
          .send(Buffer.from((await res?.arrayBuffer()) as ArrayBuffer));
      });
    } catch (err) {
      reply.code(500).send({ err });
    }
  },
});

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

(async () => {
  await app.listen({ port: parseInt(process.env.PORT || "3000") });
})();
