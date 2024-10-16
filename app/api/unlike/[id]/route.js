import db from "@/lib/db";
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
    if (!like_exist) {
        return NextResponse("DID NOT LIKED", { status: 403 });
    }
    try {
        await db
            .collection("likes")
            .deleteOne({ fingerprint: user_fingerprint, link_id: id });

        // Decrement likes count in database
        await db.collection("links").findOneAndUpdate(
            { id: id },
            {
                $inc: { likes: -1 },
            }
        );
        return new NextResponse("OK");
    } catch (e) {
        console.error(e);
        return NextResponse.error();
    }
}
