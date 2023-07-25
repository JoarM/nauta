import GithubSignin from "@/components/auth/GithubSignin";

export default function signin() {
    return (
        <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <GithubSignin/>
        </main>
    )
}