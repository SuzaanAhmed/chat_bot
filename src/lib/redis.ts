import { Redis } from "@upstash/redis";

//DId nnot need to create new Redis instance just fetched from .env
export const redis=Redis.fromEnv()