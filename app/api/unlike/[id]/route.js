import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {

    //получение ip
    const user_ip =  request.ip + request.headers.get('User-Agent');
    const id = Number(params.id);

    //проверка есть ли лайк от чела
    const like_exist = await db.collection("likes").findOne({ ip: user_ip, link_id: id });   
    if (!like_exist) {
        return NextResponse("DID NOT LIKED", { status: 400 });
    } 
    try {

        //удаление одного
        await db.collection("likes").deleteOne({ ip: user_ip, link_id: id });

        await db.collection("links").findOneAndUpdate({id: id}, {
            $inc: { likes: -1 }
        });
        return new NextResponse("OK")
    } catch (e) {
        console.error(e)
        return NextResponse.error();
    }
}