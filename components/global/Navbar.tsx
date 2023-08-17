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
                <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary-foreground">
                    <path d="M22.6466 68.0559L66.9925 1.00134L111.338 68.0559H22.6466Z" fill="currentColor"/>
                    <path d="M41.8892 72.2888H47.8734V108.194L41.8892 101.731V72.2888Z" fill="currentColor"/>
                    <path d="M62.5945 90.7201H68.5787V122.317L65.5866 125.907L62.5945 122.795V90.7201Z" fill="currentColor"/>
                    <path d="M83.2997 76.8368H89.2839V106.758L83.2997 112.742V76.8368Z" fill="currentColor"/>
                </svg>
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