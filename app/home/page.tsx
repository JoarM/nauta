import Navbar from "@/components/global/Navbar";
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
import Footer from "@/components/global/footer";

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
            <Footer />
        </>
    )
}
