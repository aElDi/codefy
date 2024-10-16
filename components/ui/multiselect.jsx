"use client";
import * as React from "react";
import { ToggleGroupItem, ToggleGroup } from "./toggle-group";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./collapsible";
import { cn } from "@/lib/utils";

const MultiSelect = React.forwardRef(
    ({ className, values, onChange, label, ...props }, ref) => (
        <ToggleGroup
            ref={ref}
            onValueChange={onChange}
            type="multiple"
            variant="outline"
            size="sm"
            className={cn(
                "flex-col items-start justify-start bg-white shadow-sm rounded-lg p-2",
                className
            )}
            {...props}>
            {values.map((value, index) => (
                <Collapsible key={index}>
                    <CollapsibleTrigger className="text-lg">
                        {"- " + value.category}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-wrap gap-1 w-fit w-screen-sm py-1">
                        {value.tags.map((tag, i) => (
                            <ToggleGroupItem
                                value={tag.toLocaleLowerCase()}
                                key={i}
                                className="h-fit w-fit p-1 data-[state=on]:bg-blue-600 data-[state=on]:text-white">
                                <span className="text-md">{tag}</span>
                            </ToggleGroupItem>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </ToggleGroup>
    )
);
MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
