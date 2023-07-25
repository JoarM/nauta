import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import ProfileMenu from "../auth/ProfileMenu";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-4 px-8 bg-primary">
            <Link href="/dashboard">
                <Image
                src="/nauta.svg"
                alt="Nauta"
                width={40}
                height={40}
                />
            </Link>
            
            <div className="flex">
                <Button variant="outline" className="bg-accent/20">Feedback</Button>
                <Button variant="ghost">Help</Button>
                <Button variant="ghost">Docs</Button>
                <span className="ml-4 flex gap-3">
                    <Button variant="outline" className="rounded-full px-3 bg-primary">
                        <Bell className="h-4 w-4"/>
                    </Button>
                    <ProfileMenu/>
                </span>
            </div>
        </nav>
    )
}