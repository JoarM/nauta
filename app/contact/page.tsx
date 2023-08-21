import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";

export default async function Contact() {
    const session = await getServerSession(authOptions);

    return (
        <>
            <Navbar session={session} />
            <main className="py-24 bg-primary px-6">
                <h1 className="sm:text-7xl text-5xl font-bold tracking-tighter text-center my-5">Get in touch</h1>
                <h2 className="sm:text-2xl text-lg tracking-tighter text-center text-primary-foreground/60">Talk to us about any problems u have with the website or anything u find great about it.</h2>
                <Card className="bg-primary w-full max-w-xl mx-auto mt-12 pt-8">
                    <CardContent>
                        <form action="" className="grid gap-6" id="contact">
                            <div className="grid gap-2">
                                <Label className="text-primary-foreground/60 font-light">Email</Label>
                                <Input required />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-primary-foreground/60 font-light">Your name</Label>
                                <Input required />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-primary-foreground/60 font-light">What on your mind?</Label>
                                <Textarea className="bg-background resize-none" rows={7} required />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button form="contact" className="w-48 max-w-full">
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </main>
            <Footer />
        </>
    )
}