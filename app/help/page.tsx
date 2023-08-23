import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/footer";
import { authOptions } from "@/lib/auth/authOptions"
import { getServerSession } from "next-auth"

export default async function help() {
    const session = await getServerSession(authOptions);

    return (
        <>
            <Navbar session={session}/>
            <main>
                Coming soon
            </main>
            <Footer />
        </>
    )
}