"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/widgets/LinkCard";
import { Button } from "@/components/ui/button";
import { LoaderCircle, SortDescIcon } from "lucide-react";
import { NotFound } from "@/components/ui/notfound";

export default function CollectionBrowser({ list, searchQuery }) {
    const [loading, setLoading] = useState(true);
    const [shownList, setShownList] = useState([]);
    const [sortRule, setSortRule] = useState("likes");

    useEffect(() => {
        setLoading(true);
        if (sortRule === "likes") {
            const newList = list.toSorted((a, b) => b.likes - a.likes);
            setShownList(newList);
        } else {
            setShownList(list.toSorted((a, b) => b.id - a.id));
        }
        setLoading(false);
    }, [sortRule, list]);

    return (
        <div className="w-full flex flex-col gap-0 md:gap-4 h-fit ">
            <div className="h-fit p-1 flex flex-col md:flex-row justify-between md:justify-start gap-2 w-full">
                {searchQuery && ( // If have search query
                    <h1 className=" dark:bg-neutral-800 dark:text-white dark:hover:bg-blue-500 bg-neutral-100 bg-opacity-80 shadow-md font-medium transition-colors rounded-md items-center flex gap-1 hover:bg-blue-500 text-black text-opacity-80 hover:text-white text-lg px-2 w-fit">
                        Results of search:{" "}
                        <b className="text-blue-700 hover:text-white">
                            {searchQuery}
                        </b>
                    </h1>
                )}
                {list.length > 0 && ( // If nothing to display
                    <Button
                        className=" dark:bg-neutral-800 dark:text-white dark:hover:bg-blue-500 bg-neutral-100 bg-opacity-80 shadow-md items-center flex gap-1 hover:bg-blue-500 text-black text-opacity-80 hover:text-white text-lg px-2 py-4 w-fit"
                        onClick={() =>
                            setSortRule(sortRule === "likes" ? "date" : "likes")
                        }>
                        <SortDescIcon strokeWidth={1} size={20} />
                        <span>
                            {sortRule === "likes" ? "Most liked" : "Recent"}
                        </span>
                    </Button>
                )}
            </div>
            {loading && ( // While loading
                <LoaderCircle
                    className="self-center animate-spin text-white mt-4"
                    size="64"
                    strokeWidth={2}
                />
            )}
            {shownList.length == 0 && !loading && <NotFound />}
            {!loading && shownList.length > 0 && (
                <div
                    className="dark:bg-neutral-800 dark:text-white grid gap-3 md:gap-4 w-full md:w-fit sm:min-w-[50%] md:min-w-[60%] lg:min-w-[77%] p-2 md:p-4 place-self-center md:bg-white md:bg-opacity-30 md:rounded-2xl"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(18rem, 1fr))",
                    }}>
                    {shownList.map((link, index) => (
                        <LinkCard linkObj={link} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
}
