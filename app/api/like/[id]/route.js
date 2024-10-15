import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    const id = Number(params.id);
    try{
        await db.collection("links").findOneAndUpdate({id: id}, {
            $inc: { likes: 1 }
        });
        return new NextResponse("OK")
    } catch (e) {
        console.error(e)
        return NextResponse.error();
    }
}