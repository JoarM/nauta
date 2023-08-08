import { Button } from "../ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import ProfileDropdown from "./ProfileDropdown";
import { authOptions } from "@/lib/auth/authOptions";

export default async function ProfileMenu() {
    const session = await getServerSession(authOptions);

    return (
        <>
            {session ? 
                <ProfileDropdown
                session={session}
                />
            :
                <Button variant="ghost" asChild>
                    <Link href="/signin">Sign in</Link>
                </Button>
            }
        </>   
    )
}