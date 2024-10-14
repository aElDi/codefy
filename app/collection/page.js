import CollectionBrowser from "@/components/CollectionBrowser";

import { JSONFilePreset } from "lowdb/node";

export default async function CollectionPage() {
  const db = await JSONFilePreset("db.json", { data: [] });
  await db.read();
  const links = db.data.data;
  links.forEach((link, i) => {
    link.id = i + 1;
  });

  return (
    <CollectionBrowser list={links} />
  );
}
