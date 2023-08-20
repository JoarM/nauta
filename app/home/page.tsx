import Navbar from "@/components/Launchpage/Navbar";
import { getServerSession } from "next-auth";
import Hero from "@/components/Launchpage/Hero";
import Plan from "@/components/Launchpage/Plan";
import { authOptions } from "@/lib/auth/authOptions";
import Elegance from "@/components/Launchpage/Elegance";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";
import { Metadata } from "next";
import RadioThemeSwitcher from "@/components/global/RadioThemeSwitcher";
import Continue from "@/components/Launchpage/Continue";

export const metadata: Metadata = {
    title: "Nauta: Quick. Graceful. Planning. For the best dev teams",
    description: "Nautas planning solutions gives developers the tools to optimize there workflow for a more efficent & coherent end result.",
    openGraph: {
        images: "/og-home.png",
        url: "",
    },
    twitter: {
        card: "summary_large_image",
    },
}

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
                <Continue />
            </main>
            <footer className="py-12 border-t">
                <nav className="flex flex-col lg:flex-row mx-auto w-[1248px] max-w-full px-6">
                    <div className="lg:w-1/3 flex justify-center lg:justify-start">
                        <Link href="/" className="h-9 py-1">
                            <svg width="579" height="128" viewBox="0 0 579 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-44">
                                <g clipPath="url(#clip0_14_18)">
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
                <div className="flex mx-auto w-[1248px] max-w-full px-6 lg:justify-between items-center mt-6 lg:flex-row flex-col gap-8">
                    <div className="flex divide-x divide-muted-foreground">
                        <Link href="https://github.com/JoarM/nauta" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors pr-4">
                            <Github className="w-[18px] h-[18px]" />
                            <span className="sr-only">Github repo</span>
                        </Link>
                        <Link href="https://twitter.com/steepval" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors pl-4">
                            <Twitter className="w-[18px] h-[18px]" />
                            <span className="sr-only">My twitter</span>
                        </Link>
                    </div>
                    <RadioThemeSwitcher />
                </div>
            </footer>
        </>
    )
}
