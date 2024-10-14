import {JSONFilePreset} from "lowdb/node"
export async function GET(request, { params }) {
    const id = Number(params.id);
    const db = await JSONFilePreset('db.json', { data: [] });
    await db.update((data) => {
        data.data[id-1].likes -= 1;
    });
    return new Response("OK");
}