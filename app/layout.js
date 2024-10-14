import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Codefy",
  description: "Collection of all useful links for programmers",
};

const font = Open_Sans({ weight: "variable", subsets: ["cyrillic", "latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased p-2 md:p-4 bg-gradient-to-tl from-white to-blue-300 bg-no-repeat bg-fixed h-full text-foreground`}
      >
          <div className="flex flex-row w-full justify-center">
            <div className="flex flex-col gap-2 w-full xl:w-3/4">
              <Header className="sticky top-2 md:top-4 z-50" />
              <div className="flex flex-col items-center md:py-4">{children}</div>
            </div>
          </div>
      </body>
    </html>
  );
}
