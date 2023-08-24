import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/footer";
import { authOptions } from "@/lib/auth/authOptions"
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import { getServerSession } from "next-auth";
import styles from "./Help.module.scss";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
                <div className="w-[1248px] max-w-full px-6 md:px-0 mx-auto mt-8">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                Is Nauta free?
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-foreground/70">
                                Nauta is currently completly free to use and open source tho this might come to change in the future.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                Can you login without github?
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-foreground/70">
                                No github is currently the only login provider we allow, other alternatives might be added in the future. 
                                To create a github account go to <Link href="https://github.com/signup" className="hover:underline focus-visible:underline whitespace-nowrap text-foreground">https://github.com/signup</Link>.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                How do I keyboard navigate?
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-foreground/70">
                                To keyboard navigate simply focus the drag handle of the desired item, press space to grab the item, 
                                now you can move the item via your arrow keys, to relase the item press space again or to canel click esc.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </main>
            <Footer />
        </>
    )
}