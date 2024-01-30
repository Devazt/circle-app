import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary/cloudinary";
import amqp from "amqplib";
import threadWorker from "./threadWorker";
import { Request, Response } from "express";

export default new class workerHub {
    constructor() {
        AppDataSource.initialize()
        .then( async () => {
            cloudinary.upload();
            
            const connection = await amqp.connect('amqps://qnsdsybl:z8vHi_IUBwo-qCNaNnI-ejebLpjqNjqu@mustang.rmq.cloudamqp.com/qnsdsybl');

            await threadWorker.create("thread-worker", connection);
            // console.log("test response", res);
            console.log("Worker is running");
        })
        .catch(error => console.log(error));
    }
}

// export default new class workerHub {
//     async enqueue(req: Request, res: Response) {
//         try {
//                 const payload = {};

//                 const connection = await amqp.connect('amqps://qnsdsybl:z8vHi_IUBwo-qCNaNnI-ejebLpjqNjqu@mustang.rmq.cloudamqp.com/qnsdsybl');
//                 const channel = await connection.createChannel();

//                 await channel.assertQueue("thread-worker");

//                 channel.sendToQueue("thread-worker", Buffer.from(JSON.stringify(payload)));
//                 await channel.close();
//                 await connection.close();

//                 res.status(200).json({
//                     message: "Thread is queued!"
//                 });
//         } catch (error) {
//             console.error("Error while enqueuing thread", error);
//             res.status(500).json({
//                 error: "Something went wrong while enqueuing thread",
//                 message: error
//             });
//         }
//     }
// }