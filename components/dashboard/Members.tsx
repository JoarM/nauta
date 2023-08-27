"use client";

import { Member } from "@/lib/schemas";
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus, Users } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { FormEvent, useState } from "react";
import MemberCard from "./Membercard";
import LoadingButton from "../global/LoadingButton";
import { useToast } from "../ui/use-toast";

export default function Members({ members, id, owner, projectTitle, currentUser } : { members: Member[], id: string, owner: string, projectTitle: string, currentUser: string }) {
    const [to, setTo] = useState("");
    const [sending, setSending] = useState(false);
    const { toast } = useToast();

    function inviteMember(e: FormEvent) {
        e.preventDefault();
        setSending(true);

        fetch(`/api/project/${id}/members`, {
            method: "PUT",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                to: to,
                projectTitle: projectTitle
            }),
        })
        .then((res) => {
            if (res.status === 200) {
                setTo("");
                res.json()
                .then(data => toast({
                    title: "Invite successful",
                    description: data.message,
                    duration: 5000
                }));
            } else {
                res.json()
                .then(data => toast({
                    title: "Invite failed",
                    description: data.error,
                    duration: 5000
                }));
            }
        })
        .finally(() => {
            setSending(false);
        });
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Users className="w-4 h-4 sm:mr-2"/>
                    <span className="hidden sm:inline">Members</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-96">
                <DialogHeader>
                    <DialogTitle>Manage members</DialogTitle>
                    <DialogDescription>Use this pannel to invite and remove members or transfer to ownership.</DialogDescription>
                </DialogHeader>
                <form className="flex gap-2 items-end flex-wrap" onSubmit={inviteMember}>
                    <div className="grid gap-2 flex-grow">
                        <Label>Email</Label>
                        <Input placeholder="example@gmail.com" disabled={sending} value={to} onChange={(e) => setTo(e.target.value)}/>
                    </div>

                    {sending ? 
                        <LoadingButton className="ml-auto">
                            Sending invite
                        </LoadingButton> 
                    : 
                        <Button className="ml-auto">
                            <Plus className="mr-2 w-4 h-4"/>
                            <span>Invite</span>
                        </Button>
                    }
                    
                </form>
                <Separator />
                <div className="overflow-y-auto divide-y divide-border p-4 border rounded-lg">
                    {members.map((member) => 
                        <MemberCard
                        member={member}
                        owner={owner}
                        key={member.email}
                        projectId={id}
                        currentUser={currentUser}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}