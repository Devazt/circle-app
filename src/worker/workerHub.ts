import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary/cloudinary";
import amqp from "amqplib";
import threadWorker from "./threadWorker";

export default new class workerHub {
    constructor() {
        AppDataSource.initialize()
        .then( async () => {
            cloudinary.upload();
            
            const connection = await amqp.connect('amqp://localhost');

            await threadWorker.create("thread queue", connection);
            // console.log("test response", res);
            console.log("Worker is running");
        })
        .catch(error => console.log(error));
    }
}