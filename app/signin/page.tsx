import GithubSignin from "@/components/auth/GithubSignin";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signin - Nauta",
    description: "Welcome to Nauta. Signin with gitlab to start optimizing your planning.",
    openGraph: {
        images: "/og-general.png",
    },
}

export default function signin() {
    return (
        <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <GithubSignin/>
        </main>
    )
}