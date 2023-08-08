import Navbar from "@/components/Launchpage/Navbar";
import { getServerSession } from "next-auth";
import Hero from "@/components/Launchpage/Hero";
import Plan from "@/components/Launchpage/Plan";
import { authOptions } from "@/lib/auth/authOptions";
import Elegance from "@/components/Launchpage/Elegance";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <>
            <Navbar
            session={session}
            />
            <main className="bg-primary pt-24">
                <Hero />
                <Plan />
                <Elegance />
            </main>
            <footer className="py-12 border-t">
                <nav className="flex flex-col lg:flex-row mx-auto w-[1248px] max-w-full px-6">
                    <div className="lg:w-1/3 flex justify-center lg:justify-start">
                        <Link href="/" className="h-9 py-1">
                            <Image
                            src="/nauta-wordmark.svg"
                            alt="Nauta"
                            width={162}
                            height={36}
                            />
                        </Link>
                    </div>
                    <div className="lg:w-1/3 text-sm border-b lg:border-none border-muted-foreground py-2">
                        <h4>Products</h4>
                        <ul>
                            <li>
                                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Planning</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:w-1/3 text-sm border-b lg:border-none border-muted-foreground py-2">
                        <h4>Explore</h4>
                        <ul>
                            <li>
                                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">Docs</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="flex mx-auto w-[1248px] max-w-full px-6 justify-between items-center mt-6">
                    <div className="flex divide-x divide-muted-foreground">
                        <Link href="https://github.com/JoarM/nauta" className="text-muted-foreground hover:text-foreground transition-colors pr-4">
                            <Github className="w-5 h-5" />
                            <span className="sr-only">Github repo</span>
                        </Link>
                        <Link href="https://twitter.com/steepval" className="text-muted-foreground hover:text-foreground transition-colors pl-4">
                            <Twitter className="w-5 h-5" />
                            <span className="sr-only">My twitter</span>
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    )
}
