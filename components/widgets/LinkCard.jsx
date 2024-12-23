"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import {
    ArrowTopRightIcon,
    HeartFilledIcon,
    HeartIcon,
    Share1Icon,
} from "@radix-ui/react-icons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

let DEFAULT_TAGS_COUNT = 3;

export default function LinkCard({ linkObj }) {
    const [count, setCount] = useState(DEFAULT_TAGS_COUNT);
    const [isLike, setLike] = useState(false);

    useEffect(() => {
        // Adaptive tags count changing
        var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
        if (width > 768) {
            setCount(3);
            DEFAULT_TAGS_COUNT = 3;
        } else if (width < 768 && width > 650) {
            setCount(4);
            DEFAULT_TAGS_COUNT = 4;
        } else {
            setCount(5);
            DEFAULT_TAGS_COUNT = 5;
        }
    }, []);

    const shareHandler = () => {
        const shareObj = {
            url: linkObj.link,
            title: linkObj.title,
            text: `Hey, look at '${linkObj.title}'`,
        };

        if (navigator.canShare(shareObj)) navigator.share(shareObj);
        else navigator.clipboard.writeText(shareObj.url);
    };

    const likeOrUnlike = async () => {
        if (!isLike) {
            setLike(true);
            fetch(`api/like/${linkObj.id}/`).catch((error) =>
                alert(error.message)
            );
            linkObj.likes += 1;
        } else {
            setLike(false);
            fetch(`api/unlike/${linkObj.id}/`).catch((error) =>
                alert(error.message)
            );
            linkObj.likes -= 1;
        }
    };

    return (
        <Card
            className="dark:bg-[#1b1b1b] w-full md:w-72 bg-white flex flex-col h-fit min-h-36"
            suppressHydrationWarning>
            <CardHeader className="pt-3 pb-1 px-3 text-2xl ">
                <CardTitle>{linkObj.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-3 py-1 pb-0 flex flex-col gap-2 grow">
                <CardDescription className="text-md basis-[2.12rem] leading-4 text-ellipsis line-clamp-2">
                    {linkObj.desc}
                </CardDescription>
                <div className="flex flex-wrap gap-1 w-fit ">
                    {linkObj.tags.slice(0, count).map(
                        (
                            tag,
                            index // Display |count| tag badges
                        ) => (
                            <Badge
                                className="dark:hover:bg-zinc-800 py-1 px-1 text-sm font-normal hover:bg-blue-100"
                                variant="outline"
                                key={index}
                                suppressHydrationWarning>
                                {tag}
                            </Badge>
                        )
                    )}
                    {linkObj.tags.length > count && ( // If there are more tags than displayed, it shows the expand button
                        <Badge
                            className="dark:hover:bg-zinc-700 py-1 px-1 text-[10px] font-normal hover:bg-zinc-300"
                            variant="secondary"
                            onClick={() => setCount(linkObj.tags.length)}>
                            <ArrowDown strokeWidth={1} size={16} />
                        </Badge>
                    )}
                    {linkObj.tags.length == count && // If tags are expanded (number of tags == count)
                        linkObj.tags.length > DEFAULT_TAGS_COUNT && ( // and the number of tags > DEFAULT_TAGS_COUNT
                            <Badge // then we show the collapse button
                                className="dark:hover:bg-zinc-700 py-1 px-1 text-[10px] font-normal hover:bg-zinc-300"
                                variant="secondary"
                                onClick={() => setCount(DEFAULT_TAGS_COUNT)}>
                                <ArrowUp strokeWidth={1} size={16} />
                            </Badge>
                        )}
                </div>
            </CardContent>
            <CardFooter className="flex px-3 py-2">
                <Link href={linkObj.link} target="_blank">
                    <Button
                        variant="outline"
                        className="flex justify-center gap-1 h-8 md:h-7 bg-blue-500 text-white px-2 text-lg md:text-md">
                        <span>Go to</span>
                        <ArrowTopRightIcon />
                    </Button>
                </Link>
                <div className="w-full flex flex-row-reverse gap-2">
                    <Button
                        variant="outline"
                        className="dark:hover:bg-zinc-800 dark:bg-zinc-900 h-8 md:h-7 w-fit px-1 space-x-1"
                        onClick={likeOrUnlike}>
                        {isLike ? (
                            <HeartFilledIcon className="text-blue-500 size-5" />
                        ) : (
                            <HeartIcon className="text-blue-500 size-5" />
                        )}

                        <span className="text-md font-light">
                            {linkObj.likes}
                        </span>
                    </Button>
                    <Button
                        variant="outline"
                        className="dark:hover:bg-zinc-800 dark:bg-zinc-900 h-8 md:h-7 w-8 md:w-7 px-1"
                        onClick={shareHandler}>
                        <Share1Icon className="text-blue-500 size-5" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
