import { createClient } from "redis";

const ReidsClient = createClient({
    password: "O2TcKeKjTWqAhPnDGvi36my3jOebTQMP",
    socket: {
        host: "redis-19084.c299.asia-northeast1-1.gce.cloud.redislabs.com",
        port: 19084
    }
});

ReidsClient.on("error", function (error) {
    console.error(error)
})

export async function redisConnect() {
    try {
        await ReidsClient.connect();
        console.log("Redis connected");
    } catch (error) {
        console.error("Redis connection error", error);
        process.exit(1);
    }
}

const DEFAULT_EXPIRATION = 3600;

export { ReidsClient, DEFAULT_EXPIRATION }