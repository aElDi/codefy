import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**@param {import('next/server').NextRequest} request Request object */
export function getRequsetFingerprint(request) {
    const user_ip = request.ip || request.headers.get("X-Forwarded-For");
    return user_ip + request.headers.get("User-Agent");
}
