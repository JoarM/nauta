"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { signOut } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function ProfileDropdown(
    { 
        session, 
        size 
    } 
    : 
    { 
        session: Session;
        size?: "default" | "sm" | "lg" | null | undefined;
    }) {
    const pathname = usePathname();

    const user = session.user;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full focus-visible:ring-ring ring-offset-2 ring-offset-background focus-visible:ring-2 outline-none hidden md:flex">
                    <Avatar className={`border ${size === "sm" ? "w-9 h-9" : ""} ${size === "lg" ? "h-11 w-11"  : ""}`}>
                        <AvatarImage src={user?.image as string | undefined} alt={user?.name as string} loading="eager"/>
                        <AvatarFallback>{user?.name}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-0 w-64 py-4 mx-6 bg-primary rounded-2xl hidden md:block">
                    <DropdownMenuLabel className="font-medium px-6 py-0">{user?.name}</DropdownMenuLabel>
                    <span className="px-6 font-normal text-sm text-muted-foreground">{user?.email}</span>
                    <DropdownMenuGroup className="grid mt-2">
                        <Link 
                        href="/dashboard" 
                        className="px-6 py-1 hover:bg-background/90 focus-visible:bg-background/90 outline-none focus-visible:text-primary-foreground aria-[current='page']:bg-background/90 transition-colors text-primary-foreground/60 hover:text-primary-foreground aria-[current='page']:text-primary-foreground" 
                        aria-current={pathname === "/dashboard" ? "page" : false}
                        >
                            Dashboard
                        </Link>
                        <Link 
                        href="/account" 
                        className="px-6 py-1 hover:bg-background/90 focus-visible:bg-background/90 outline-none focus-visible:text-primary-foreground aria-[current='page']:bg-background/90 transition-colors text-primary-foreground/60 hover:text-primary-foreground aria-[current='page']:text-primary-foreground" 
                        aria-current={pathname  === "/account" ? "page" : false}
                        >
                            Settings
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="mx-6 my-3"/>
                    <DropdownMenuGroup className="grid">
                        <Link 
                        href="/" 
                        target="_blank"
                        className="px-6 py-1 hover:bg-background/90 focus-visible:bg-background/90 outline-none focus-visible:text-primary-foreground transition-colors text-primary-foreground/60 hover:text-primary-foreground flex justify-between items-center"
                        >
                            <span>Homepage</span>
                            <ExternalLink className="h-4 w-4"/>
                        </Link>
                        <button
                        className="px-6 py-1 hover:bg-background/90 focus-visible:bg-background/90 outline-none focus-visible:text-primary-foreground transition-colors text-primary-foreground/60 hover:text-primary-foreground text-start"
                        onClick={() => signOut()}
                        >
                            Sign out
                        </button>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}