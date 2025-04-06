import { createClient } from '@redis/client';

class Redis {
  constructor() {
    if (Redis.instance) return Redis.instance;

    this.client = createClient({
      socket: {
        host: 'localhost',
        port: 6379,
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000)
      }
    });

    this.client.on('connect', () => console.log('Redis client connected'));
    this.client.on('error', (err) => console.log(`Redis error: ${err.message}`));
    this.client.on('reconnecting', () => console.log('Redis client reconnecting...'));

    this.connect().catch(err => console.error('Failed to connect Redis:', err));
    Redis.instance = this;
  }

  async connect() {
    if (!this.client.isOpen) await this.client.connect();
  }

  async setEx(key, value, ttl = 24 * 60 * 60) {
    await this.connect();
    await this.client.setEx(key, ttl, value);
  }

  async set(key,value) {
    await this.connect();
    await this.client.setEx(key, value);
  }

  async get(key) {
    await this.connect();
    return await this.client.get(key);
  }

  async del(key) {
    await this.connect();
    await this.client.del(key);
  }

  async quit() {
    if (this.client.isOpen) {
      await this.client.quit();
      console.log('Redis connection closed');
    }
  }
}

const redisInstance = new Redis();
export default redisInstance;