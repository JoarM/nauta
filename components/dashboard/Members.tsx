import { Member } from "@/lib/schemas";
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus, Users } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { useMemo } from "react";
import MemberCard from "./Membercard";

export default function Members({ members, id, owner } : { members: Member[], id: string, owner: string }) {
    const sortedMembers = useMemo(() => {
        return members.sort((a, b) => {
            if (b.email === owner) return 1;
            return 0; 
        });
    }, [members])

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Users className="w-4 h-4 mr-2"/>
                    <span>Members</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage members</DialogTitle>
                    <DialogDescription>Use this pannel to invite and remove members or transfer to ownership.</DialogDescription>
                </DialogHeader>
                <form action={`/api/project/${id}/members`} method="post" className="flex gap-2 items-end flex-wrap">
                    <div className="grid gap-2 flex-grow">
                        <Label>Email</Label>
                        <Input placeholder="example@gmail.com"/>
                    </div>
                    <Button className="ml-auto">
                        <Plus className="mr-2 w-4 h-4"/>
                        <span>Invite</span>
                    </Button>
                </form>
                <Separator />
                <ScrollArea className="max-h-72">
                    {sortedMembers.map((member) => 
                        <MemberCard
                        member={member}
                        owner={member.email === owner}
                        />
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}