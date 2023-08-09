"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Menu, X, ExternalLink } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react"

export default function PhoneNav({ session }: { session: Session | null }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="md:hidden group" aria-expanded={menuOpen}>
            <Button size="sm" variant="outline" className="px-0 w-9 rounded-full bg-primary hover:bg-primary" onClick={() => setMenuOpen(!menuOpen)}>
                <Menu className="w-4 h-4 group-aria-expanded:hidden"/>
                <X className="w-4 h-4 hidden group-aria-expanded:block"/>
            </Button>
            <nav className="navdrop fixed top-[61px] left-0 right-0 bg-primary hidden md:hidden group-aria-expanded:block px-6 z-50">
                {session ? 
                    <ul>
                        <li className="py-4 flex justify-between items-center border-b">
                            <span>
                                <div className="font-medium">{session.user?.name}</div>
                                <div className="text-sm text-muted-foreground">{session.user?.email}</div>
                            </span>
                            <Avatar className="w-6 h-6">
                                <AvatarImage src={session.user?.image as string | undefined} alt={session.user?.name as string} loading="eager"/>
                                <AvatarFallback>{session.user?.name}</AvatarFallback>
                            </Avatar>
                        </li>
                        <li className="border-b">
                            <Link href="/dashboard" className="hover:bg-background focus-visible:bg-background outline-none py-4 block text-muted-foreground transition-colors">
                                Dashboard
                            </Link>
                        </li>
                        <li className="border-b">
                            <Link href="/account" className="hover:bg-background focus-visible:bg-background outline-none py-4 block text-muted-foreground transition-colors">
                                Settings
                            </Link>
                        </li>
                        <li className="border-b">
                            <button onClick={() => signOut()} className="hover:bg-background focus-visible:bg-background outline-none py-4 w-full text-start text-muted-foreground transition-colors">
                                Logout
                            </button>
                        </li>
                    </ul>
                :
                    <Button asChild className="mt-4 w-full">
                        <Link href="/signin">Sign in</Link>
                    </Button>
                }
                <ul className="mt-8">
                    <li className="border-b">
                        <Link href="/help" className="hover:bg-background focus-visible:bg-background outline-none py-4 block text-muted-foreground transition-colors">
                            Help
                        </Link>
                    </li>
                    <li className="border-b">
                        <Link href="/docs" className="hover:bg-background focus-visible:bg-background outline-none py-4 block text-muted-foreground transition-colors">
                            Documentation
                        </Link>
                    </li>
                    <li className="border-b">
                    <Link href="/home" target="_blank" className="hover:bg-background focus-visible:bg-background outline-none py-4 flex justify-between items-center text-muted-foreground transition-colors ">
                            Homepage
                            <ExternalLink className="w-4 h-4"/>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}