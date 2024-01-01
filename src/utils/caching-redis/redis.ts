import { createClient } from "redis";

const ReidsClient = createClient({
    password: "lZJtdNluk4lY6aRgU3YFPBuFlNlZ0Qfs",
    socket: {
        host: "redis-14446.c302.asia-northeast1-1.gce.cloud.redislabs.com",
        port: 14446
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