// import fastifyMysql from "@fastify/mysql";
// import fp from "fastify-plugin";

// async function mysqlPlugin(fastify, options) { 
//     await fastify.register(fastifyMysql, {
//         host: 'localhost',
//         port: 3306,
//         user: 'root',
//         password: '1234',
//         database: 'book_store',
//         promise: true,
//     });
//     console.log('Database connected successfully');
// }

// // 2. Wrap your plugin before exporting it
// export default fp(mysqlPlugin);

import { Sequelize } from "sequelize";
import fp from "fastify-plugin";
import bookModel from "../models/book.model.js";

async function sequelizePlugin(fastify, options) {
    const sequelize = new Sequelize("book_store", "root", "1234", {
        host: "localhost",
        port: 3306,
        dialect: "mysql",
        logging: true,
    });

    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (err) {
        fastify.log.error("Unable to connect to the database:", err);
        throw err;
    }

    // makes fastify.db available everywhere, same way fastify.mysql was
    const Books = bookModel.defineBooks(sequelize);
    fastify.decorate("db", { sequelize, Books });

    fastify.addHook("onClose", async (instance) => {
        await instance.db.close();
    });
}

export default fp(sequelizePlugin);