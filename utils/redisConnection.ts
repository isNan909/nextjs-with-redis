import Redis from "ioredis";

export const redisConnect = new Redis(process.env.REDIS_URL);
