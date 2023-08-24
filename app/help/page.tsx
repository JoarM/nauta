import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/footer";
import { authOptions } from "@/lib/auth/authOptions"
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import { getServerSession } from "next-auth";
import styles from "./Help.module.scss";
import Link from "next/link";

export default async function help() {
    const session = await getServerSession(authOptions);

    return (
        <>
            <Navbar session={session}/>
            <main className="pt-[61px] bg-primary pb-24 md:px-6">
                <div className="bg-background/60 md:rounded-md pt-20 pb-28 grid gap-6 place-items-center w-[1248px] max-w-full px-6 mx-auto md:mt-12 isolate">
                    <div className={cn("p-5 bg-primary rounded-full relative", styles.gradient)}>
                        <BookOpen className="w-6 h-6" /> 
                    </div>
                    <div className="grid place-items-center max-w-lg text-center">
                        <h1 className="font-bold text-4xl">How can we help?</h1>
                        <h2 className="text-foreground/60 md:text-2xl">Discover solutions through 
                        our <Link href="/docs" className="text-foreground">documentation</Link>
                        , <a href="#faq" className="text-foreground"
                        >faq</a> or <Link href="/contact" className="text-foreground"
                        >message us</Link>
                        </h2>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}