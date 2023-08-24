"use client"

import { Member } from "@/lib/schemas";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { UserX } from "lucide-react";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

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
    const { toast } = useToast();
    const router = useRouter();
    
    function removeUser() {
        updateDoc(doc(db, "projects", projectId), {
            memberEmails: arrayRemove(member.email),
            members: arrayRemove(member),
        })
        .then(() => {
            router.refresh();
        })
        .catch(() => {
            toast({
                title: "Error removing user",
                description: "An error occured when removing the user please try again soon.",
                duration: 5000,
            })
        });
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