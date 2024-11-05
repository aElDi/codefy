"use client";

import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header({ className }) {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const searchHandler = () => {
        router.push("/search?q=" + searchText);
    };

    return (
        <header
            className={cn(
                "bg-white bg-opacity-60 backdrop-blur-sm rounded-lg shadow-md jump-sm flex py-0 px-3 md:px-2 gap-3 md:gap-4 items-center hover:bg-opacity-70 ",
                className
            )}>
            <Link href="/">
                <Image
                    className="scale-125 md:scale-100"
                    alt="logo"
                    width={32}
                    height={32}
                    src="/img/logo@light.png"
                />
            </Link>

            <nav className="flex gap-4 w-full">
                <Link
                    className="text-lg hover:text-blue-500 transition-colors "
                    href="/collection">
                    Collection
                </Link>
                <Link
                    className="text-lg hover:text-blue-500 transition-colors "
                    href="/create">
                    Create
                </Link>
            </nav>

            <div className="flex gap-2 items-center">
                <Input
                    type="text"
                    placeholder="Search"
                    className="h-6 w-28 md:w-full md:h-fit"
                    onInput={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) searchHandler();
                    }}
                    icon={
                        <Button
                            type="submit"
                            variant="ghost"
                            size={18}
                            onClick={searchHandler}>
                            <MagnifyingGlassIcon
                                color="gray"
                                width={18}
                                height={18}
                            />
                        </Button>
                    }></Input>
                <Link href="https://github.com/aElDi/codefy">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-8 scale-125 hover:bg-transparent">
                        <GitHubLogoIcon strokeWidth={1} />
                    </Button>
                </Link>
            </div>
        </header>
    );
}
