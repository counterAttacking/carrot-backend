import express from "express";
import { createServer, Server } from "http";
import bodyParser from "body-parser";
import controller from "./controller";
import database from "./config/database";

const app = express();

database.sync({
    alter: true,
});
app.use(bodyParser.json());
app.use(controller);

const server = createServer(app);
server.listen(process.env.PORT || 5000);