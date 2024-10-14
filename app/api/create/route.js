import {JSONFilePreset} from "lowdb/node"
export async function POST(request) {
    const res = await request.json()
    const db = await JSONFilePreset('db.json', { data: [] });
    res.likes = 0;
    db.data.data.push(res);
    await db.write();
    return new Response("OK") 
}