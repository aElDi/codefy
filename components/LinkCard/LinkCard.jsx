"use client";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "../ui/card";
import Link from "next/link";
import {
  ArrowTopRightIcon,
  HeartFilledIcon,
  HeartIcon,
  Share1Icon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

let DEFAULT_TAGS_COUNT = 3;

export default function LinkCard({ linkObj }) {
  const [count, setCount] = useState(DEFAULT_TAGS_COUNT);
  const [isLike, setLike] = useState(false);

  useEffect(() => {
      var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (width > 768) {
        setCount(3);
      } else if (width < 768 && width > 650) {
        setCount(4);
      } else {
        setCount(5);
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
      fetch(`api/like/${linkObj.id}/`).catch((error) => alert(error.message));
      linkObj.likes += 1;
    } else {
      setLike(false);
      fetch(`api/unlike/${linkObj.id}/`).catch((error) => alert(error.message));
      linkObj.likes -= 1;
    }
  };

  return (
    <Card
      className="w-full md:w-72 bg-white flex flex-col h-fit min-h-36"
      suppressHydrationWarning
    >
      <CardHeader className="pt-3 pb-1 px-3 text-2xl">
        <CardTitle>{linkObj.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 py-1 pb-0 flex flex-col gap-2 grow">
        <CardDescription className="text-md basis-[2.12rem] leading-4 text-ellipsis line-clamp-2">
          {linkObj.desc}
        </CardDescription>
        <div className="flex flex-wrap gap-1 w-fit ">
          {linkObj.tags.slice(0, count).map((tag, index) => (
            <Badge
              className="py-1 px-1 text-sm font-normal hover:bg-blue-100"
              variant="outline"
              key={index}
              suppressHydrationWarning
            >
              {tag}
            </Badge>
          ))}
          {linkObj.tags.length > count && (
            <Badge
              className="py-1 px-1 text-[10px] font-normal hover:bg-zinc-300"
              variant="secondary"
              onClick={() => setCount(linkObj.tags.length)}
            >
              <ArrowDown strokeWidth={1} size={16} />
            </Badge>
          )}
          {linkObj.tags.length <= count &&
            linkObj.tags.length > DEFAULT_TAGS_COUNT && (
              <Badge
                className="py-1 px-1 text-[10px] font-normal hover:bg-zinc-300"
                variant="secondary"
                onClick={() => setCount(DEFAULT_TAGS_COUNT)}
              >
                <ArrowUp strokeWidth={1} size={16} />
              </Badge>
            )}
        </div>
      </CardContent>
      <CardFooter className="flex px-3 py-2">
        <Link href={linkObj.link} target="_blank">
          <Button
            variant="outline"
            className="flex justify-center gap-1 h-8 md:h-7 bg-blue-500 text-white px-2 text-lg md:text-md"
          >
            <span>Go to</span>
            <ArrowTopRightIcon />
          </Button>
        </Link>
        <div className="w-full flex flex-row-reverse gap-2">
          <Button
            variant="outline"
            className="h-8 md:h-7 w-fit px-1 space-x-1"
            onClick={likeOrUnlike}
          >
            {isLike ? (
              <HeartFilledIcon className="text-blue-500 size-5" />
            ) : (
              <HeartIcon className="text-blue-500 size-5" />
            )}

            <span className="text-md font-light">{linkObj.likes}</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 md:h-7 w-8 md:w-7 px-1"
            onClick={shareHandler}
          >
            <Share1Icon className="text-blue-500 size-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
