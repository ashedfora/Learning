const redis = require('redis');
const client = redis.createClient(6379,'127.0.0.1');
client.on('connect', () => console.log('abcd'))
client.on('end', () => console.log('Redis connection is closed.'));
client.on('reconnecting', (o) => {
 console.log('Redis client is reconnecting!');
 console.log(`Attempt no. ${o.attempt}`);
 console.log(`Milliseconds since last attempt: ${o.delay}`);
y
});
