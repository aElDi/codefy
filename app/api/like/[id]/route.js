import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {

    //получение ip
    const user_ip = request.ip + request.headers.get('User-Agent'); 
    const id = Number(params.id);


    const like_exist = await db.collection("likes").findOne({ ip: user_ip, link_id: id });
    if (like_exist) {
        //если лайк есть то нельзя ставить
        return new NextResponse("ALREADY EXIST", { status: 400 });
    }

    try {
        await db.collection("links").findOneAndUpdate({id: id}, {
            $inc: { likes: 1 }
        });

        //сохраняем инфу о лайке
        await db.collection("likes").insertOne({ ip: user_ip, link_id: id });

        return new NextResponse("OK")
    } catch (e) {
        console.error(e)
        return NextResponse.error();
    }
}