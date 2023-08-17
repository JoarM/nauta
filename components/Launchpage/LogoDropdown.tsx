"use client";

import Link from "next/link";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuTrigger } from "../ui/context-menu";
import Image from "next/image";
import { ClipboardList, LayoutGrid, Type } from "lucide-react";

export default function LogoDropdown() {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Link href="/dashboard" className="text-primary-foreground">
                    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:hidden">
                        <path d="M22.6466 68.0559L66.9925 1.00134L111.338 68.0559H22.6466Z" fill="currentColor"/>
                        <path d="M41.8892 72.2888H47.8734V108.194L41.8892 101.731V72.2888Z" fill="currentColor"/>
                        <path d="M62.5945 90.7201H68.5787V122.317L65.5866 125.907L62.5945 122.795V90.7201Z" fill="currentColor"/>
                        <path d="M83.2997 76.8368H89.2839V106.758L83.2997 112.742V76.8368Z" fill="currentColor"/>
                    </svg>
                    <svg width="579" height="128" viewBox="0 0 579 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-44 hidden md:block">
                        <g clip-path="url(#clip0_14_18)">
                            <path d="M22.6465 68.0559L66.9924 1.00137L111.338 68.0559H22.6465Z" fill="currentColor"/>
                            <path d="M41.8892 72.2889H47.8734V108.194L41.8892 101.731V72.2889Z" fill="currentColor"/>
                            <path d="M62.5945 90.7202H68.5787V122.317L65.5866 125.907L62.5945 122.795V90.7202Z" fill="currentColor"/>
                            <path d="M83.2997 76.8369H89.2839V106.758L83.2997 112.742V76.8369Z" fill="currentColor"/>
                            <path d="M206.091 17.9091V111H195.182L144.455 37.9091H143.545V111H132.273V17.9091H143.182L194.091 91.1818H195V17.9091H206.091ZM232.466 111H220.648L254.83 17.9091H266.466L300.648 111H288.83L261.011 32.6364H260.284L232.466 111ZM236.83 74.6364H284.466V84.6364H236.83V74.6364ZM376.239 17.9091H387.511V79.5455C387.511 85.9091 386.011 91.5909 383.011 96.5909C380.042 101.561 375.845 105.485 370.42 108.364C364.996 111.212 358.633 112.636 351.33 112.636C344.027 112.636 337.663 111.212 332.239 108.364C326.814 105.485 322.602 101.561 319.602 96.5909C316.633 91.5909 315.148 85.9091 315.148 79.5455V17.9091H326.42V78.6364C326.42 83.1818 327.42 87.2273 329.42 90.7727C331.42 94.2879 334.269 97.0606 337.966 99.0909C341.693 101.091 346.148 102.091 351.33 102.091C356.511 102.091 360.966 101.091 364.693 99.0909C368.42 97.0606 371.269 94.2879 373.239 90.7727C375.239 87.2273 376.239 83.1818 376.239 78.6364V17.9091ZM404.932 27.9091V17.9091H474.75V27.9091H445.477V111H434.205V27.9091H404.932ZM485.091 111H473.273L507.455 17.9091H519.091L553.273 111H541.455L513.636 32.6364H512.909L485.091 111ZM489.455 74.6364H537.091V84.6364H489.455V74.6364Z" fill="currentColor"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_14_18">
                                <rect width="579" height="128" fill="currentColor"/>
                            </clipPath>
                        </defs>
                    </svg>
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