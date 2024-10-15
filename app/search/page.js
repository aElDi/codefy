import CollectionBrowser from "@/components/CollectionBrowser";

import { JSONFilePreset } from "lowdb/node";
import { redirect } from "next/navigation";


export default async function SearchPage({params, searchParams}) {
  const q = searchParams.q;
  if (!q) return redirect("/collection")
  const db = await JSONFilePreset("db.json", { data: [] });
  const { data } = db.data;
  const links = data.filter((link) =>
    link.title.toLowerCase().includes(q.toLowerCase())
  );
  links.forEach((link, i) => {
    link.id = i + 1;
  });

  return (
    <CollectionBrowser list={links} searchQuery={q} />
    
  );
}
