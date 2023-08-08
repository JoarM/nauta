"use client";

import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FolderOpenDot, LogOut, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import LoadingButton from "../global/LoadingButton";
import { useRouter } from "next/navigation";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "../ui/use-toast";
import { Member } from "@/lib/schemas";

interface props {
    title: string;
    description: string;
    owner: boolean;
    id: string;
    members: Member[];
    email: string
}

export default function ProjectCard({
    title,
    description,
    owner,
    id,
    members,
    email
} : props) {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [confirm, setConfirm] = useState("");
    const [removing, setRemoving] = useState(false);
    const { toast } = useToast();

    function deleteProject() {
        setRemoving(true);

        deleteDoc(doc(db, "projects", id))
        .then(() => {
            router.refresh();
        })
        .catch(() => {
            toast({
                title: "Delete failed",
                description: "The delete process failed please try agian soon",
                duration: 5000,
            });
        })
        .finally(() => {
            setRemoving(false);
        });
    }

    function leaveProject() {
        const index = members.findIndex(memeber => memeber.email === email);
        if (index < 0) {
            toast({
                title: "An error occured",
                description: "An unexpected error happend please try agian soon.",
                duration: 5000,
            });

            return
        }
        members.splice(index, 1);

        updateDoc(doc(db, "projects", id), {
            memberEmails: arrayRemove(email),
            members: members,
        })
        .then(() => {
            router.refresh();
        })
        .catch(() => {
            toast({
                title: "Error leaving project",
                description: "An error occured when leaving the project please try again soon.",
                duration: 5000,
            });
        });
    }

    return (
        <>
            <Link className="group relative isolate outline-none" href={`/dashboard/${id}`} key={id}>
                <FolderOpenDot className="absolute w-8 h-8 p-2 rounded-full bg-primary-foreground text-primary 
                left-full -translate-x-[60%] 
                bottom-full translate-y-3/4 group-hover:translate-y-1/2 group-focus-visible:translate-y-1/2
                opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition"/>
                <Card className="group-hover:border-primary-foreground group-focus-visible:border-primary-foreground transition-colors">
                    <CardHeader>
                        <CardTitle>{ title }</CardTitle>
                        <CardDescription>{ description }</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button variant="destructive" size="icon" className="ml-auto" onClick={(e) => {
                            e.preventDefault();
                            setModalOpen(true);
                        }}>
                            {owner ? <Trash2 className="w-4 h-4" /> : <LogOut className="w-4 h-4" />}
                            {owner ? <span className="sr-only">Delete project</span> : <span className="sr-only">Leave project</span>}
                        </Button>
                    </CardFooter>
                </Card>
            </Link>
            
            {owner ? 
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete { title }</DialogTitle>
                            <DialogDescription>Are you sure you want to delete { title }. Deletes are permanent and can not be reverted.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-2">
                            <Label>Enter <q className="italic">{ title }</q> to confirm delte</Label>
                            <Input placeholder={title} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                        </div>
                        <DialogFooter>
                            {removing ? 
                                <LoadingButton>Deleting</LoadingButton> 
                            : 
                                <Button disabled={confirm != title} onClick={deleteProject}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    <span>Delete</span>
                                </Button>
                            }
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            :
                <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Leave { title }</AlertDialogTitle>
                            <AlertDialogDescription>Are you sure you want to leave the { title } planning board. The only way to rejoin is by another invite.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={leaveProject}>Leave</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            }
        </>
        
    )
}