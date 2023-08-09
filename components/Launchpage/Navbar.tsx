"use client";

import LogoDropdown from "./LogoDropdown";
import { Button } from "../ui/button";
import Link from "next/link";
import ProfileDropdown from "../auth/ProfileDropdown";
import NavSection from "./NavSection";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { ClipboardList, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "next-auth/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function Navbar({ session } : { session: Session | null }) {
    const [atTop, setAtTop] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const observed = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setAtTop(entry.isIntersecting);
          });
          if (!observed.current) return;
          observer.observe(observed.current);
          return () => observer.disconnect();
    }, [])

    return (
        <>
            <div className="invisible sr-only" aria-hidden ref={observed}></div>
            <div className={`fixed left-0 right-0 top-0 z-20 py-3 border-b border-border/50 bg-primary md:bg-primary/40 transition data-[attop=true]:border-transparent backdrop-blur-sm`} data-attop={atTop}>
                <header className="mx-auto px-6 w-[1448px] max-w-full flex justify-between items-center">
                    <div className="grid grid-flow-col gap-8">
                        <LogoDropdown />
                        <NavSection />
                    </div>
                    {session ? 
                        <ProfileDropdown
                            size="sm"
                            session={session}
                        />
                    :
                        <Button size="sm" asChild className="hidden md:inline-flex">
                            <Link href="/signin">Sign in</Link>
                        </Button>
                    }
                    <div className="md:hidden group " aria-expanded={menuOpen}>
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
                            <li>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="feauters">
                                        <AccordionTrigger>Features</AccordionTrigger>
                                        <AccordionContent>
                                            <ul>
                                                <li>
                                                    <Link href="/dashboard" className="hover:bg-background focus-visible:bg-background outline-none py-3 text-muted-foreground text-base transition-colors flex items-center">
                                                        <ClipboardList className="w-4 h-4 mr-2"/>
                                                        Planning
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </li>
                            <li className="border-b">
                                <Link href="/docs" className="hover:bg-background focus-visible:bg-background outline-none py-4 block text-muted-foreground transition-colors">
                                    Docs
                                </Link>
                            </li>
                        </ul>
                        </nav>
                    </div>
                </header>
            </div>
        </>
    )
}