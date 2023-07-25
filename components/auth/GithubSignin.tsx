"use client";

import { Button } from "../ui/button";
import { LucideGithub } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function GithubSignin() {
    const searchParams = useSearchParams();
    const callbackParam = searchParams.get("callbackUrl");
    const callbackUrl = callbackParam ? callbackParam : "/dashboard";

    return (
        <Button onClick={() => signIn("github", { callbackUrl: callbackUrl })}>
            <LucideGithub className="mr-2 h-4 w-4"/> Sign in with github
        </Button>
    )
}