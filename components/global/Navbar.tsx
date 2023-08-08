import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import ProfileMenu from "../auth/ProfileMenu";
import Link from "next/link";
import Feedback from "./Feedback";
import PhoneNav from "./PhoneNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <nav className="flex justify-between items-center py-4 px-8 bg-primary">
            <Link href="/dashboard">
                <Image
                src="/nauta-logo.svg"
                alt="Nauta"
                width={40}
                height={40}
                />
            </Link>
            
            <div className="md:flex hidden gap-1">
                <Feedback />
                <Button variant="ghost">Help</Button>
                <Button variant="ghost">Docs</Button>
                <span className="ml-4 flex gap-3">
                    <Button variant="outline" size="icon" className="rounded-full bg-primary">
                        <Bell className="h-4 w-4"/>
                        <span className="sr-only">Alerts</span>
                    </Button>
                    <ProfileMenu/>
                </span>
            </div>
            <PhoneNav session={session} />
        </nav>
    )
}