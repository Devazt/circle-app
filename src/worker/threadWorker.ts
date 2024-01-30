import { EventEmitter } from "stream";
import * as amqp from "amqplib";
import { AppDataSource } from "../data-source";
import { v2 as cloudinary } from "cloudinary";
import { Thread } from "../entities/Thread";
import { request } from "http";
import { Repository } from "typeorm";

// export default new class ThreadWorker {
//     private readonly ThreadRepo: Repository<Thread> = AppDataSource.getRepository(Thread);
//     private emitter = new EventEmitter();

//     async create(queueName: string, connection: any) {
//         try {
//             const channel = await connection.createChannel();
//             await channel.assertQueue(queueName);
//             await channel.consume(queueName, async (message) => {
//                 try {
//                     if (message !== null) {
//                         const payload = JSON.parse(message.content.toString());

//                         const cloudinaryRes = payload.image
//                         ? await cloudinary.destination(payload.image)
//                         : null;

//                         const thread = this.ThreadRepo.create({
//                             content: payload.content,
//                             image: cloudinaryRes,
//                             user: {
//                                 id: payload.user.id
//                             }
//                         });

//                         const threadRes = await this.ThreadRepo.save(thread)

//                         this.emitter.emit("message");
//                         console.log(`(Worker): Thread is created`, threadRes);

//                         channel.ack(message)
//                     }
//                 } catch (error) {
//                     console.log(`(Worker): is failed : ${error}`);
//                 }
//             });

//         } catch (error) {
//             console.log(`(worker) error consume queue from thread : ${error}`)
//         }
//     }
// }

export default new class ThreadWorker extends EventEmitter {
    private readonly queueRepo: Repository<Thread> = AppDataSource.getRepository(Thread);

    async create(queueName: string, connect: amqp.Connection) {
        try {
            const channel = await connect.createChannel();

            await channel.assertQueue(queueName);
            await channel.consume(queueName, async (message) => {
                if (message !== null) {
                    try {
                        const payload = JSON.parse(message.content.toString());
                        
                        console.log("Received payload:", payload);

                        cloudinary.config(
                            {
                                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                                api_key: process.env.CLOUDINARY_API_KEY,
                                api_secret: process.env.CLOUDINARY_API_SECRET,
                                secure: true,
                            }
                        );
                        
                        const cloudRes = await cloudinary.uploader.upload(
                            "src/uploads/" + payload.image,
                            {
                                folder: `circle/user/${payload.user.id}-${payload.user.username}/thread`,
                                tags: "circle,user,thread"
                            }
                        );


                        const thread = this.queueRepo.create({
                            content: payload.content,
                            image: cloudRes.secure_url,
                            user: {
                                id: payload.user.id
                            }
                        });

                        await this.queueRepo.save(thread);

                        const req = request({
                            hostname: "localhost",
                            port: 5000,
                            path: "/api/v1/thread",
                            method: "GET",
                        });

                        req.on("response", (response) => {
                            console.log(response);
                        });

                        req.on("error", (error) => {
                            console.log(error);
                        });

                        req.end();

                        channel.ack(message);
                    } catch (error) {
                        console.log(`(Worker): is failed : ${error}`);
                    }
                }
            })
        } catch (error) {
            console.log(`(worker) error consume queue from thread : ${error}`)
        }
    }
}