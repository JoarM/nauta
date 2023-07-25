"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { signOut } from "next-auth/react";
import styles from "../Components.module.scss";

export default function ProfileDropdown({ session } : { session: Session }) {
    const pathname = usePathname();
    const [hidden, setHidden] = useState(true);

    const user = session.user;

    return (
        <>
            {!hidden && (
                <div className="absolute inset-0 bg-transparent z-20" onClick={() => setHidden(true)} aria-label="Close popover"></div>
            )}
            <div className="relative h-10">
                <button onClick={() => setHidden(prev => !prev)} aria-haspopup="menu">
                    <Avatar className="border">
                        <AvatarImage src={user?.image as string | undefined} alt={user?.name as string} loading="eager"/>
                        <AvatarFallback>{user?.name}</AvatarFallback>
                    </Avatar>
                </button>
                <div aria-hidden={hidden} className={styles.popover + " absolute top-[120%] right-0 border rounded-2xl py-2 bg-primary w-64 z-30"}>
                    <header className="grid">
                        <span className="font-medium px-6">{user?.name}</span>
                        <span className="px-6 font-normal text-sm text-muted-foreground">{user?.email}</span>
                    </header>
                    <section className="grid mt-2">
                        <Link 
                        href="/dashboard" 
                        className="px-6 py-1 hover:bg-accent/80 aria-[current='page']:bg-accent/80 transition-colors text-primary-foreground/60 hover:text-primary-foreground aria-[current='page']:text-primary-foreground" 
                        aria-current={pathname === "/dashboard" ? "page" : false}
                        >
                            Dashboard
                        </Link>
                        <Link 
                        href="/account" 
                        className="px-6 py-1 hover:bg-accent/80 aria-[current='page']:bg-accent/80 transition-colors text-primary-foreground/60 hover:text-primary-foreground aria-[current='page']:text-primary-foreground" 
                        aria-current={pathname  === "/account" ? "page" : false}
                        >
                            Settings
                        </Link>
                    </section>
                    <Separator orientation="horizontal" className="my-2"/>
                    <section className="grid">
                        <Link 
                        href="/" 
                        target="_blank"
                        className="px-6 py-1 hover:bg-accent/80 transition-colors text-primary-foreground/60 hover:text-primary-foreground flex justify-between items-center"
                        >
                            <span>Homepage</span>
                            <ExternalLink className="h-4 w-4"/>
                        </Link>
                        <button
                        className="px-6 py-1 hover:bg-accent/80 transition-colors text-primary-foreground/60 hover:text-primary-foreground text-start"
                        onClick={() => signOut()}
                        >
                            Sign out
                        </button>
                    </section>
                </div>
            </div>
        </>
    )
}