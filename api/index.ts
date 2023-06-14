import fastify from "fastify";
import { getMMI } from "../src/index";
import { readFile } from "fs";
import path from "path";
import { Drive } from "deta";
import createFastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";

const buildFastify = (options: FastifyServerOptions = {}): FastifyInstance => {
  const fastify = createFastify({
    logger: {
      level: "debug",
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname,plugin",
        },
      },
    },
    ...options,
  });

  fastify.register(fastifyRequestLogger);

  return fastify;
};

const drive = Drive("photos");
const app = buildFastify();

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
          // picutrePath: { type: "string" },
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
  return {
    "/mmi": "Get MMI info in JSON format",
    "/image?file=mmi.jpg": "Get MMI info in image",
    "/mmi?file=heatmap.jpg": "Get NIFTY 50 Heatmap from TradingView",
  };
});

(async () => {
  await app.listen({ port: parseInt(process.env.PORT || "3000") });
})();
