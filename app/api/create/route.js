import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(request) {
    const res = await request.json();
    const newId = await db.collection("links").countDocuments();
    res.likes = 0;
    res.id = newId + 1;
    try {
        await db.collection("links").insertOne(res);
        return new NextResponse("OK");
    } catch (e) {
        console.error(e);
        return NextResponse.error()
    }    
}