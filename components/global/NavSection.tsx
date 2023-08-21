"use client";

import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { ClipboardList } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function NavSection() {
    const pathname = usePathname();

    return (
        <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="space-x-2">
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-9 rounded-3xl bg-transparent">Features</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-2 bg-primary/50">
                        <ul className="min-w-[282px] max-w-xl">
                            <li className="p-3 bg-transparent hover:bg-foreground/5 rounded-md transition-colors">
                                <Link href="/dashboard">
                                    <div className="font-medium leading-none mb-2 flex">
                                        <ClipboardList className="w-4 h-4 mr-2"/>
                                        Planning
                                    </div>
                                    <p className="text-foreground/50">The planning suit for devlopers</p>
                                </Link>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <li>
                    <Button asChild size="sm" variant="ghost">
                        <Link href="/docs">
                            Docs
                        </Link>
                    </Button>
                </li>
                <li>
                    <Button asChild size="sm" variant="ghost" className={`${pathname === "/templates" ? "bg-foreground/5 rounded-3xl text-foreground" : ""}`}>
                        <Link href="/templates" aria-current={`${pathname === "/templates" ? "page" : "false"}`}>
                            Templates
                        </Link>
                    </Button>
                </li>
            </NavigationMenuList>
        </NavigationMenu>
    )
}