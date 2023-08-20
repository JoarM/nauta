import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ExternalLink } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export default async function Continue() {
    const session = await getServerSession(authOptions);

    return (
        <div className="mx-auto w-[1248px] max-w-full px-6 mt-12 pb-24">
            <h3 className="text-center text-lg font-medium text-primary-foreground/60">Start your planning journey with Nauta</h3>
            <div className="grid md:grid-cols-2 gap-6 mt-16">
                <Card className="bg-primary">
                    <CardHeader>
                        <CardTitle>Visit our docs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Visit our documentation to learn all about how to use the platform.</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild size="sm" variant="ghost" className="ml-auto">
                            <Link href="/docs">
                                <span>To docs</span>
                                <ExternalLink className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="bg-primary">
                    <CardHeader>
                        <CardTitle>Get in touch</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Contact us with your questions, requests or to schedule a live call.</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild size="sm" variant="ghost" className="ml-auto">
                            <Link href="/docs">
                                <span>Contact</span>
                                <ExternalLink className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <div className=" flex items-center mt-8">
                {!session ? 
                    <Button asChild className="mx-auto w-80 max-w-full">
                        <Link href="/signin">Sign in</Link>
                    </Button>
                :
                    <Button asChild className="mx-auto w-80 max-w-full">
                        <Link href="/dashboard">Go to dashboard</Link>
                    </Button>
                }
            </div>
        </div>
    )
}