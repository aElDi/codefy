"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export function Header({ className }) {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        }
    }, []);
    const toggleTheme = () => {
        const newTheme = !isDarkMode ? "dark" : "light";
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme);
    };

    const searchHandler = () => {
        router.push("/search?q=" + searchText);
    };

    return (
        <header
            className={cn(
                "dark:bg-zinc-800 bg-white bg-opacity-60 backdrop-blur-sm rounded-lg shadow-md jump-sm flex py-0 px-3 md:px-2 gap-3 md:gap-4 items-center hover:bg-opacity-70 ",
                className
            )}>
            <Link href="/">
                <Image
                    className="w-8 h-8 scale-150 xs:scale-150 md:scale-100"
                    alt="logo"
                    width={33}
                    height={33}
                    src={
                        isDarkMode
                            ? "/img/logo@dark.svg"
                            : "/img/logo@light.svg"
                    }
                />
            </Link>

            <nav className="flex gap-3 md:gap-4 w-full">
                <Link
                    className="text-base sm:text-lg hover:text-blue-500 transition-colors font-medium"
                    href="/collection">
                    Collection
                </Link>
                <Link
                    className="text-base sm:text-lg hover:text-blue-500 transition-colors font-medium"
                    href="/create">
                    Create
                </Link>
            </nav>
            <div className="max-[400px]:gap-1 md:gap-2 flex items-center">
                <Input
                    type="text"
                    placeholder="Search"
                    className="dark:bg-zinc-900 h-6 w-24 md:w-full md:h-fit"
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
                <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    className="p-2 h-10 w-8">
                    {isDarkMode ? (
                        <Image
                            className="scale-150 md:scale-150"
                            alt="logo"
                            width={32}
                            height={32}
                            src="/icons/light.svg"
                        />
                    ) : (
                        <Image
                            className="scale-150 md:scale-150"
                            alt="logo"
                            width={32}
                            height={32}
                            src="/icons/dark.svg"
                        />
                    )}
                </Button>

                <Link href="https://github.com/aElDi/codefy">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-8 scale-150 hover:bg-transparent">
                        <GitHubLogoIcon strokeWidth={1} />
                    </Button>
                </Link>
            </div>
        </header>
    );
}
