import Fastify from "fastify";
import bookRoutes from "../routes/bookRoutes.js"
import mysqlPlugin from "../connection/conn.js"
const fastify = Fastify({
    logger: false,
});

// fastify.addHook('preSerialization', (request, reply, payload, done) => {
//     console.log(`[preSerialization DEBUG] URL: ${request.url}`);

//     if (request.url.includes('/books') && payload && typeof payload === 'object') {
//         console.log("[preSerialization] → modifying");
//         done(null, {
//             ...payload,
//             serverMessage: "Added from preSerialization hook",
//             addedAt: Date.now()
//         });
//     } else {
//         done(null, payload);
//     }
// });

// Then register your routes// routes: add onResponse hook only for routes under /v1
fastify.register(bookRoutes, { prefix: '/v1' });
//database
fastify.register(mysqlPlugin)

const PORT = 3001
try {
    fastify.listen({ port: `${PORT}` });
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}