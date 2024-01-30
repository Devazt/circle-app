import express from "express";
import session from "express-session";
import cors from "cors";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import router from "./routes";
import { redisConnect } from "./utils/caching-redis/redis";
import swaggerUI from "swagger-ui-express";
import apidocs from "./apidocs.json";

dotenv.config();

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        const port = 5000;
        redisConnect();

        const corsOptions = {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }

        app.use(session({
            secret: process.env.JWT_SECRET,
            resave: false,
            saveUninitialized: true
        }));
        
        app.use(express.json());
        app.use(cors(corsOptions));
        app.use("/api/v1", router);
        app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(apidocs));

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => console.log(error));