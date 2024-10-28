"use client";
import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    title: z.string({ message: "Title must be string" }).trim().min(3).max(20),
    link: z.string().trim().url(),
    desc: z.string({ message: "Description must be string" }).trim().max(200),
    tags: z.array(z.string()).max(7, { message: "Not more than 7 tags" }),
});

const defaultValues = {
    title: "",
    link: "",
    desc: "",
    tags: [],
};

export default function CreateForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
    });
    const [isLoading, setLoading] = useState(false);
    const { toast } = useToast();

    function formSubmit(values) {
        setLoading(true);
        axios
            .post("/api/create", values)
            .then((res) => {
                form.reset(defaultValues);
                if (res.status === 200) {
                    toast({
                        title: "Done",
                        description:
                            "Successfully added! Your card will appear in the collection soon",
                    });
                    setLoading(false);
                }
            })
            .catch((e) => {
                form.setError("root", e);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: e.message,
                });
                setLoading(false);
            });
    }

    return (
        <div className="w-full max-w-screen-md card flex flex-col gap-3 ">
            <h3 className="text-center text-3xl font-bold">Add your link</h3>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(formSubmit)}
                    className="dark:bg-zinc-350 space-y-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="dark:text-white text-xl h-10"
                                        placeholder="Title"
                                        disabled={isLoading}
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
                                        className="dark:text-white text-xl h-10"
                                        placeholder="Link"
                                        disabled={isLoading}
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
                                        className="dark:text-white text-xl h-10 justify-start"
                                        placeholder="Description"
                                        disabled={isLoading}
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
                                    <MultiSelect
                                        values={tags}
                                        disabled={isLoading}
                                        {...field}
                                    />
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
