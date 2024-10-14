"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import { Button } from "../ui/button";
import { SortDescIcon } from "lucide-react";

export default function CollectionBrowser({ list }) {
  const [shownList, setShownList] = useState(list);
  const [sortRule, setSortRule] = useState("likes");

  useEffect(() => {
    if (sortRule === "likes") {
      const newList = list.toSorted((a, b) => b.likes - a.likes);
      setShownList(newList);
    } else {
      setShownList(list.toSorted((a, b) => b.id - a.id));
    }
  }, [sortRule]);

  return (
    <div className="w-full flex flex-col gap-4 h-fit ">
      <div className="h-fit p-1 flex gap-2 ">
        <Button
          className="bg-white bg-opacity-80 shadow-md items-center flex gap-1 hover:bg-blue-500 text-black text-opacity-80 hover:text-white text-lg px-2 py-4 w-fit"
          onClick={() => setSortRule(sortRule === "likes" ? "date" : "likes")}
        >
          <SortDescIcon strokeWidth={1} size={20} />
          <span>{sortRule === "likes" ? "Most liked" : "Recent"}</span>
          
        </Button>

      </div>
      <div className="grid gap-4 w-fit sm:min-w-[50%] md:min-w-[60%] lg:min-w-[77%] p-4 place-self-center bg-white bg-opacity-30 rounded-2xl"
           style={{ gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))" }}>
        {shownList.map((link, index) => ( 
          <LinkCard linkObj={link} key={index} />
        ))}
      </div>
    </div>
  );
}
