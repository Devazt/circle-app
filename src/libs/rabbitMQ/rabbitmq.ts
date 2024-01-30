import ampq from "amqplib";

export default async function messageQueue(queueName: string, payload: any): Promise<boolean> {
    try {
        const connection = await ampq.connect('amqps://qnsdsybl:z8vHi_IUBwo-qCNaNnI-ejebLpjqNjqu@mustang.rmq.cloudamqp.com/qnsdsybl');
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName);

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));

        await channel.close();
        connection.close

        return null;
    } catch (error) {
        return error
    }
}