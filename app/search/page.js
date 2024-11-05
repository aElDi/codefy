import CollectionBrowser from "@/components/pages/CollectionBrowser";
import db from "@/lib/db";
import { escapeRegExp } from "@/lib/utils";

import { redirect } from "next/navigation";

export default async function SearchPage({ params, searchParams }) {
    const q = escapeRegExp(searchParams.q);
    if (!q) return redirect("/collection");
    const links = await db
        .collection("links")
        .find({ title: RegExp(q, "i") })
        .toArray();

    links.forEach((link) => {
        delete link._id;
    });
    return <CollectionBrowser list={links} searchQuery={q} />;
}
