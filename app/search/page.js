import CollectionBrowser from "@/components/CollectionBrowser";
import db from "@/lib/db";

import { redirect } from "next/navigation";

export default async function SearchPage({ params, searchParams }) {
  const q = searchParams.q;
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
