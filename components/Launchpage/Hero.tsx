"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
    const [current, setCurrent] = useState(3);
    useEffect(() => {
        setInterval(() => setCurrent(prev => prev + 1), 2000);
    }, [])

    return (
        <div className="mx-auto w-[1248px] max-w-full px-6">
            <h1 className="tracking-tighter font-extrabold text-7xl xl:text-8xl text-center mt-32">
                <div className={`bg-gradient-to-r from-green-700 lg:inline to-lime-500 bg-clip-text transition-colors duration-500 ${current % 3 === 0 ? "text-transparent" : "text-foreground"}`}>Quick.</div>
                <div className={`bg-gradient-to-r from-sky-500 lg:inline to-teal-400 bg-clip-text transition-colors duration-500 ${current % 3 === 1 ? "text-transparent" : "text-foreground"}`}>Graceful.</div>
                <div className={`pb-2 bg-gradient-to-r from-fuchsia-700 lg:inline to-violet-500 bg-clip-text transition-colors duration-500 ${current % 3 === 2 ? "text-transparent" : "text-foreground"}`}>Planning.</div>
            </h1>
            <h2 className="text-xl xl:text-2xl text-foreground/60 w-[780px] max-w-full mx-auto text-center mb-16">Nautas planning solutions gives developers the tools to optimize there workflow for a more efficent & coherent end result.</h2>
            <span className="flex md:flex-row flex-col items-center justify-center gap-4 md:gap-8">
                <Button size="lg" className="text-lg w-96 md:w-56 max-w-full" asChild>
                    <Link href="/dashboard">
                        <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 shrink-0">
                            <path d="M22.6466 68.0559L66.9925 1.00134L111.338 68.0559H22.6466Z" fill="currentColor"/>
                            <path d="M41.8892 72.2888H47.8734V108.194L41.8892 101.731V72.2888Z" fill="currentColor"/>
                            <path d="M62.5945 90.7201H68.5787V122.317L65.5866 125.907L62.5945 122.795V90.7201Z" fill="currentColor"/>
                            <path d="M83.2997 76.8368H89.2839V106.758L83.2997 112.742V76.8368Z" fill="currentColor"/>
                        </svg>
                        Start planning
                    </Link>
                </Button>
                <Button className="relative w-96 md:w-56 max-w-full overflow-hidden after:absolute after:inset-[1px] after:bg-primary after:rounded-md hover:after:bg-transparent focus-visible:after:bg-transparent after:transition-colors" asChild>
                    <Link href="/contact">
                        <span className={`bg-gradient-to-br from-green-800 to-lime-500 absolute inset-0 transition-opacity duration-500 ${current % 3 === 0 ? "opacity-100" : "opacity-0"}`}></span>
                        <span className={`bg-gradient-to-br from-sky-500 to-teal-400  absolute inset-0 transition-opacity duration-500 ${current % 3 === 1 ? "opacity-100" : "opacity-0"}`}></span>
                        <span className={`bg-gradient-to-br from-fuchsia-700 to-violet-500 absolute inset-0 transition-opacity duration-500 ${current % 3 === 2 ? "opacity-100" : "opacity-0"}`}></span>
                        <span className="z-10 text-foreground text-lg">Contact us</span>
                    </Link>
                </Button>
            </span>
        </div>    
    )
}