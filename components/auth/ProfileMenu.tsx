import { Button } from "../ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileDropdown from "./ProfileDropdown";

export default async function ProfileMenu() {
    const session = await getServerSession(authOptions);

    return (
        <>
            {session ? 
                <ProfileDropdown
                session={session}
                />
            :
                <Button variant="ghost">
                    <Link href="/signin">Signin</Link>
                </Button>
            }
        </>
            
    )
}