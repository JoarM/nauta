import { Member } from "@/lib/schemas";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { UserX } from "lucide-react";

export default function MemberCard({ member, owner } : { member: Member, owner: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="border">
                <AvatarImage src={member.photoUrl as string | undefined} alt={member.name} loading="eager"/>
                <AvatarFallback>{member.name}</AvatarFallback>
            </Avatar>
            <div className="grid">
                <span className="text-base leading-none">{ member.name }</span>
                <span className="text-sm leading-none text-muted-foreground">{ member.email }</span>
            </div>
            {!owner && 
                <Button variant="destructive" size="icon" className="ml-auto">
                    <UserX className="w-4 h-4"/>
                    <span className="sr-only">Remove user</span>
                </Button>
            }
        </div>
    )
}