"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";

export function Header({ className }) {
  return (
    <header
      className={cn(
        "bg-white bg-opacity-60 backdrop-blur-sm rounded-lg shadow-md jump flex py-1 px-2 gap-4 items-center",
        className
      )}
    >
      <Link href="/">
        <Image alt='logo' width={32} height={32} src="/img/logo@light.png"/>
      </Link>

      <nav className="flex gap-4 w-full">
        <Link
          className="text-lg hover:text-blue-500 transition-colors "
          href="/collection"
        >
          Collection
        </Link>
        <Link
          className="text-lg hover:text-blue-500 transition-colors "
          href="/create"
        >
          Create
        </Link>
      </nav>

      <section className="flex gap-2 items-center">
        <Input
          type="text"
          placeholder="Search"
          icon={
            <Button variant="ghost" size={18} onClick={() => alert("No work")}>
              <MagnifyingGlassIcon color="gray" width={18} height={18} />
            </Button>
          }
        ></Input>
        <Link href="https://github.com/aElDi/codefy">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <GitHubLogoIcon strokeWidth={1}  />
          </Button>
        </Link>
      </section>
    </header>
  );
}
