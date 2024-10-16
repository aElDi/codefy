"use client";
import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { MultiSelect } from "../ui/multiselect";
import tags from "@/tags.json";

const formSchema = z.object({
    title: z.string({ message: "Title must be string" }).trim().min(3).max(20),
    link: z.string().trim().url(),
    desc: z.string({ message: "Description must be string" }).trim().max(200),
    tags: z.array(z.string()).max(7, { message: "Not more than 7 tags" }),
});

export default function CreateForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            link: "",
            desc: "",
            image: "",
            tags: [],
        },
    });

    function formSubmit(values) {
        axios.post("/api/create", values).then((res) => {
            console.log(res);
        });
    }

    return (
        <div className="w-full max-w-screen-md card flex flex-col gap-3 ">
            <h3 className="text-center text-3xl font-bold">Add your link</h3>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(formSubmit)}
                    className="space-y-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="text-xl h-10"
                                        placeholder="Title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="text-xl h-10"
                                        placeholder="Link"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="desc"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        className="text-xl h-10 justify-start"
                                        placeholder="Description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>
                                    {" "}
                                    <h2 className="text-2xl font-medium px-1 w-full text-center">
                                        Tags
                                    </h2>
                                </FormLabel>
                                <FormControl>
                                    <MultiSelect values={tags} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div />
                    <Button className="w-full text-lg h-9 flex gap-2 px-3 pr-2">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
