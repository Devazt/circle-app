import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary/cloudinary";
import { Thread } from "../entities/Thread";
import { EventEmitter } from "stream";

export default new class ThreadWorker {
    private readonly ThreadRepo: Repository<Thread> = AppDataSource.getRepository(Thread);
    private emitter = new EventEmitter();

    async create(queueName: string, connection: any) {
        try {
            const channel = await connection.createChannel();
            await channel.assertQueue(queueName);
            await channel.consume(queueName, async (message) => {
                try {
                    if (message !== null) {
                        const payload = JSON.parse(message.content.toString());

                        const cloudinaryRes = payload.image
                        ? await cloudinary.destination(payload.image)
                        : null;

                        const thread = this.ThreadRepo.create({
                            content: payload.content,
                            image: cloudinaryRes,
                            user: {
                                id: payload.user.id
                            }
                        });

                        const threadRes = await this.ThreadRepo.save(thread)

                        this.emitter.emit("message");
                        console.log(`(Worker): Thread is created`, threadRes);

                        channel.ack(message)
                    }
                } catch (error) {
                    console.log(`(Worker): is failed : ${error}`);
                }
            });

        } catch (error) {
            console.log(`(worker) error consume queue from thread : ${error}`)
        }
    }
}