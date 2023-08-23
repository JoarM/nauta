
import Form from "@/components/contact/Form";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/footer";
import { Card, CardContent } from "@/components/ui/card";
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
                        <Form />
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </>
    )
}