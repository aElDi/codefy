import CollectionBrowser from "@/components/pages/CollectionBrowser";
import db from "@/lib/db";

export const dynamic = "force-dynamic";
export default async function CollectionPage() {
    const links = await db.collection("links").find({}).toArray();

    links.forEach((link) => {
        delete link._id;
    });

    return <CollectionBrowser list={links} />;
}
