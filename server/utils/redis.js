import { createClient } from '@redis/client';

export class Redis {
  constructor() {
    this.ttl = 24 * 3600 * 1000; 
    this.client = createClient({
      socket: {
        host: 'localhost',
        port: 6379
      }
    });

    this.client.on('connect', () => {
      console.log('Redis client connected');
    });

    this.client.on('error', (err) => {
      console.log(`Something went wrong: ${err}`);
    });
  }

  async connect() {
    await this.client.connect();
  }

  async set(key, value) {
    await this.client.setEx(key, this.ttl, value);
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.log(err.message); 
    }
  }

  async del(key) {
    await this.client.del(key);
  }

  async quit() {
    await this.client.quit();
  }
}

