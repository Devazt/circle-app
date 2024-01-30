import { Request, Response } from "express";
import messageQueue from "../libs/rabbitMQ/rabbitmq";

export default new class threadQueue {
    async create(req: Request, res: Response) {
        try {
            const payload = {
                content: req.body.content,
                image: res.locals.filename,
                user: {
                    id: res.locals.loginSession.user.id,
                    username: res.locals.loginSession.user.username
                }
            }

            const errorQueue = await messageQueue("thread-worker", payload);
            if (errorQueue) return res.status(500).json({
                error: "Something went wrong while enqueuing thread to worker",
                message: errorQueue
            });

            return res.status(201).json({
                message: "Thread is queued!",
                payload
            });

        } catch (error) {
            console.error("Error while enqueuing thread", error);
            res.status(500).json({
                error: "Something went wrong while enqueuing thread",
                message: error
            });
        }
    }
}