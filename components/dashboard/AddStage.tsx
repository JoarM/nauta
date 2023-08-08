"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import LoadingButton from "../global/LoadingButton";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Stage, ZodStage } from "@/lib/schemas";
import { useToast } from "../ui/use-toast";
import { db } from "@/lib/firebase";

export default function AddStage({ id } : { id: string }) {
    const [title, setTitle] = useState("");
    const [adding, setAdding] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    async function createStage(e: FormEvent) {
        e.preventDefault();
        setAdding(true);

        const parse = await ZodStage.safeParseAsync(title);

        if (parse.success) {
            const stage: Stage = {
                title: title,
                tasks: [],
                id: crypto.randomUUID(),
            }

            updateDoc(doc(db, "projects", id), {
                stages: arrayUnion(stage),
            })
            .then(() => {
                setTitle("");
                setOpen(false);
            })
            .catch(() => {
                toast({
                    title: "An error occured",
                    description: "An error occured when adding the stage please try again soon",
                    duration: 5000
                });
            })
            .finally(() => {
                setAdding(false);
            });
        } else {
            toast({
                title: "Invalid title",
                description: parse.error.issues.at(0)?.message,
                duration: 5000
            });
            setAdding(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Plus className="sm:mr-2 w-4 h-4" />
                    <span className="sm:inline hidden">Add stage</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add stage</DialogTitle>
                    <DialogDescription>Add new stage to manage tasks</DialogDescription>
                </DialogHeader>
                <form className="grid gap-2" id="newStage" onSubmit={createStage}>
                    <Label>Stage title</Label>
                    <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={adding} />
                </form>
                <DialogFooter>
                    {adding ? 
                        <LoadingButton>
                            Adding stage
                        </LoadingButton>
                    :
                        <Button type="submit" form="newStage">
                            <Plus className="mr-2 w-4 h-4" />
                            <span>Add stage</span>
                        </Button>
                    }
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}