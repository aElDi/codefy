import { Button } from "@/components/ui/button";
import { GitHubLogoIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="w-full 2xl:w-3/4 h-full flex flex-col gap-2 md:gap-4 ">
            <div className="card flex w-full justify-between duration-500 hover:bg-opacity-90 overflow-hidden relative">
                <div className="flex flex-col gap-4 md:p-2">
                    <h1 className="text-4xl md:text-6xl font-bold text-blue-500">
                        Codefy
                    </h1>
                    <span className="hidden md:block pl-1 text-lg lg:text-xl font-medium opacity-80">
                        Have a look to collection of useful links
                    </span>
                    <div className="flex gap-2">
                        <Link href="/collection">
                            <Button className="bg-blue-500 text-md p-3 py-4 hover:bg-white hover:text-blue-700">
                                Browse
                            </Button>
                        </Link>
                        <Link href="/create">
                            <Button
                                variant="outline"
                                className="h-8 w-fit px-2 border-gray-400 text-gray-500 hover:text-blue-500 hover:border-blue-300">
                                <span className="pr-1">Add Link</span>
                                <PlusIcon width={20} height={20} />
                            </Button>
                        </Link>
                    </div>
                </div>
                <Image
                    className="absolute -top-full -right-[33%]  md:-top-3/4 md:right-2 scale-50 md:scale-100"
                    src="/img/logomonocolor.svg"
                    width={512}
                    height={512}></Image>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between gap-2 md:gap-6">
                <div className="card w-full jump-sm hover:bg-opacity-90">
                    <h2 className="text-3xl font-semibold mb-2">What is it?</h2>
                    <span className="opacity-80">
                        This collection features valuable links for programmers,
                        including articles, courses, libraries, and tools
                        designed to help you bring your{" "}
                        <b className="uppercase">best projects</b> to life.
                    </span>
                </div>
                <div className="card w-full jump-sm hover:bg-opacity-90">
                    <h2 className="text-3xl font-semibold mb-2">How to add?</h2>
                    <span className="opacity-80">
                        On the{" "}
                        <Link
                            href="/create"
                            className="text-blue-600 after:content-['_↗']">
                            Create page
                        </Link>
                        , you can easily add a link to a collection by selecting
                        tags and sending the link, which will then appear in the
                        collection right away.
                    </span>
                </div>
                <div className="card w-full space-y-2 jump-sm hover:bg-opacity-90">
                    <h2 className="text-3xl font-semibold mb-2">Source code</h2>
                    <span className="flex flex-col gap-2">
                        <Link
                            href="https://github.com/aElDi/codefy"
                            className="flex flex-row gap-3 items-center w-fit">
                            <GitHubLogoIcon width={26} height={26} />
                            <span className="text-lg underline underline-offset-2 after:content-['_↗']">
                                Github
                            </span>
                        </Link>
                        <span>
                            If you have a suggestions or questions, you can
                            contact us in Telegram:{" "}
                            <Link
                                className="text-blue-600"
                                href="https://t.me/a3ldi">
                                @a3ldi
                            </Link>{" "}
                            or{" "}
                            <Link
                                className="text-blue-600"
                                href="https://t.me/saloloh">
                                @saloloh
                            </Link>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
