import fastify from 'fastify';
import { getMMI } from '../src/index';

const app = fastify({ logger: true });

app.get('/', async (request, reply) => {
    return await getMMI();
});

(async () =>{
    await app.listen({ port: 3000 })
})();

