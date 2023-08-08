import JoinProject from "@/components/dashboard/JoinProject";
import Navbar from "@/components/global/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Invite({ searchParams } : { searchParams: { photoUrl: string, sender: string, projectId: string, projectTitle: string } }) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect(`/signin?callbackUrl=${encodeURIComponent("/invite?" + searchParams.toString())}`);
    }
    const { photoUrl, sender, projectId, projectTitle } = searchParams;
    
    return (
        <>
            <Navbar/>

            <main className="grid place-items-center">
                <Card className="my-10 mx-6">
                    <CardHeader>
                        <CardTitle>Invite by { sender }</CardTitle>
                        <CardDescription>{ sender } has invited you to join his planning board { projectTitle }.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid justify-center">
                        <Avatar className="w-32 h-32">
                            <AvatarImage src={photoUrl as string | undefined} alt={sender as string}/>
                            <AvatarFallback>{sender}</AvatarFallback>
                        </Avatar>
                        <span className="text-center mt-1 text-lg font-medium">{sender}</span>
                    </CardContent>
                    <CardFooter>
                        <JoinProject 
                        id={projectId}
                        title={projectTitle}
                        />
                    </CardFooter>
                </Card>
            </main>
        </>
    )
}