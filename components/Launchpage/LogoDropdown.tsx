"use client";

import Link from "next/link";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuTrigger } from "../ui/context-menu";
import Image from "next/image";
import { ClipboardList, LayoutGrid, Type } from "lucide-react";

export default function LogoDropdown() {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Link href="/dashboard" className="h-9 py-1">
                    <Image
                    src="/nauta-wordmark.svg"
                    alt="Nauta"
                    width={162}
                    height={36}
                    className="w-full h-full hidden md:block"
                    />
                    <Image
                    src="/nauta-logo.svg"
                    alt="Nauta"
                    width={36}
                    height={36}
                    className="w-full h-full md:hidden"
                    />
                </Link>
            </ContextMenuTrigger>
            <ContextMenuContent className="bg-background">
                <ContextMenuLabel>Platform</ContextMenuLabel>
                <ContextMenuItem className="w-64" asChild>
                    <button>
                        <Image
                        src="/nauta-logo.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5 mr-2"
                        />
                        Copy logo to clipboard
                    </button>
                </ContextMenuItem>
                <ContextMenuItem className="w-64" asChild>
                    <button>
                        <Type className="w-5 h-5 mr-2"/>
                        Copy wordmark to clipboard
                    </button>
                </ContextMenuItem>
                <ContextMenuItem className="w-64" asChild>
                    <Link href="/dashboard">
                        <LayoutGrid className="w-5 h-5 mr-2"/>
                        Dashboard
                    </Link>
                </ContextMenuItem>
                <ContextMenuLabel>Products</ContextMenuLabel>
                <ContextMenuItem className="w-64" asChild>
                    <Link href="/dashboard">
                        <ClipboardList className="w-5 h-5 mr-2"/>
                        Planning
                    </Link>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}