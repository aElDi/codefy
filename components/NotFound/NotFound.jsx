import { CrossCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col w-fit self-center items-center gap-3 card">
            <CrossCircledIcon className="w-16 h-16 text-red-400" />
            <h2 className="text-3xl font-bold">Not found :(</h2>
            <content>
                Try writing another query or add a link via the{" "}
                <Link
                    href="/create"
                    className="text-blue-600 after:content-['_↗']">
                    form
                </Link>
            </content>
        </div>
    );
}
