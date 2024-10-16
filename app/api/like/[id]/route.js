import db from "@/lib/db";
import { getRequsetFingerprint } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    // Gets user fingerprint.
    // Allows to block spamming
    const user_fingerprint = getRequsetFingerprint(request);
    const id = Number(params.id);

    // Check like existing
    const like_exist = await db
        .collection("likes")
        .findOne({ fingerprint: user_fingerprint, link_id: id });
    if (like_exist) {
        return new NextResponse("ALREADY EXIST", { status: 409 });
    }

    try {
        // Increment likes count in database
        await db.collection("links").findOneAndUpdate(
            { id: id },
            {
                $inc: { likes: 1 },
            }
        );

        await db
            .collection("likes")
            .insertOne({ fingerprint: user_fingerprint, link_id: id });

        return new NextResponse("OK");
    } catch (e) {
        console.error(e);
        return NextResponse.error();
    }
}
