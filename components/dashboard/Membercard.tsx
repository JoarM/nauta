"use client"

import { Member } from "@/lib/schemas";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { UserX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export default function MemberCard(
    { 
        member, 
        owner, 
        projectId, 
        currentUser,
    } 
    : 
    { 
        member: Member; 
        owner: string;
        projectId: string;
        currentUser: string;
    }) 
    {
    const router = useRouter();
    const { toast } = useToast();
    
    async function removeUser() {
        const res = await fetch(`/api/project/${projectId}/members`, {
            method: "PUT",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(member),
        });

        if (res.ok) {
            router.refresh();
        } else {
            const error = await res.json();

            toast({
                title: "An error occured",
                description: error.error,
                duration: 5000,
            });
        }
    }

    return (
        <div className="flex items-center gap-2 py-2" key={member.email}>
            <Avatar className="border">
                <AvatarImage src={member.photoUrl as string | undefined} alt={member.name} loading="eager"/>
                <AvatarFallback>{member.name}</AvatarFallback>
            </Avatar>
            <div className="grid">
                <span className="text-base leading-none">{ member.name }</span>
                <span className="text-sm leading-none text-muted-foreground">{ member.email }</span>
            </div>
            {(owner === currentUser && owner != member.email) && 
                <Button variant="destructive" size="icon" className="ml-auto" onClick={removeUser}>
                    <UserX className="w-4 h-4"/>
                    <span className="sr-only">Remove user</span>
                </Button>
            }
        </div>
    )
}