import { createClient } from 'redis';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
// console.log(`Redis Config: ${JSON.stringify(process.env)}`);
// Read the Redis username and password from the environment variables or fallback to secrets
const redisUsername = process.env.REDIS_USERNAME || fs.readFileSync('/run/secrets/redis_username', 'utf8').trim();
const redisPassword = process.env.REDIS_PASSWORD || fs.readFileSync('/run/secrets/redis_password', 'utf8').trim();
const redis_port = process.env.REDIS_PORT || 6379;
let redis_config;

if (process.env.REDIS_HOST) {
  redis_config = {
    host: process.env.REDIS_HOST,
    port: redis_port,
    username: redisUsername,
    password: redisPassword, // Ensure the password is included
  };
} else {
  redis_config = {
    url: `redis://${redisUsername}:${redisPassword}@redis:${redis_port}`, // Updated URL with username and password
  };
}

const redisClient = createClient(redis_config); // Pass the config object to createClient

redisClient.on('error', (err) => {
  console.error('Redis error:', err)
  console.error('redis_config',redis_config);
});

const connectRedis = async () => {
  try {
    // console.log(`Connecting to Redis at ${JSON.stringify(redis_config)}`);
    await redisClient.connect(); // Establish connection to Redis
    console.log('Connected to Redis');
  } catch (err) {
    console.error('##Error connecting to Redis:', err);
  }
};

export { redisClient, connectRedis };
