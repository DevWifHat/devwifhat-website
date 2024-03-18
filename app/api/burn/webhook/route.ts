import { createClient } from '@vercel/kv';

const kvClient = createClient({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: Request) {
    const data = await req.json();
    
    // Retrieve the current event queue
    let eventQueue: any = await kvClient.get('eventQueue');
    eventQueue = eventQueue ? JSON.parse(eventQueue) : [];
    
    // Append the new event to the queue
    eventQueue.push(data);
    
    // Store the updated queue back in Vercel KV
    await kvClient.set('eventQueue', JSON.stringify(eventQueue), { ex: 3600 }); // Optional expiration

    return new Response(JSON.stringify({ message: 'Event added to queue' }), {
        headers: { 'Content-Type': 'application/json' },
    });
}