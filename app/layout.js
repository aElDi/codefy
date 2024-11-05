import "./globals.css";

import Header from "@/components/nav/Header";
import { Open_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

/**@type {import("next").Metadata} */
export const metadata = {
    title: "Codefy",
    description:
        "Curated collection of useful links and resources for programmers, categorized by tags for easy navigation. In the ever-evolving field of programming, having quick access to quality resources can significantly enhance your learning and productivity. Codefy aims to provide a comprehensive list of valuable links, including tutorials, documentation, tools, and more, all organized by relevant tags.",
    openGraph: {
        title: "Codefy - Collection for programmers",
        description:
            "Curated collection of useful links and resources for programmers, categorized by tags for easy navigation. In the ever-evolving field of programming, having quick access to quality resources can significantly enhance your learning and productivity. Codefy aims to provide a comprehensive list of valuable links, including tutorials, documentation, tools, and more, all organized by relevant tags.",
        url: "https://codefy.a3ldi.ru/",
        siteName: "Codefy",
        images: [
            {
                url: "https://codefy.a3ldi.ru/img/banner@og.png",
                width: 1200,
                height: 630,
            },
            {
                url: "https://codefy.a3ldi.ru/img/banner@og2.png",
                width: 520,
                height: 228,
            },
        ],
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: false,
    },
    twitter: {
        card: "summary_large_image",
        title: "Codefy",
        description: "The collection of useful links for programmers",
        images: ["https://codefy.a3ldi.ru/img/banner@og.png"], // Must be an absolute URL
    },
    other: {
        "vk:image": "https://codefy.a3ldi.ru/img/banner@og2.png",
    },
};

const font = Open_Sans({ weight: "variable", subsets: ["cyrillic", "latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${font.className} antialiased p-2 md:p-4 bg-gradient-to-tl from-white to-blue-300 dark:from-[#101112] dark:to-[#151515] bg-no-repeat bg-fixed h-full text-foreground `}>
                <div className="flex flex-row w-full justify-center">
                    <div className="flex flex-col gap-2 w-full xl:w-3/4">
                        <Header className="sticky top-2 md:top-4 z-50" />
                        <div className="flex flex-col items-center md:py-4">
                            {children}
                        </div>
                    </div>
                    <Toaster />
                </div>
            </body>
        </html>
    );
}
