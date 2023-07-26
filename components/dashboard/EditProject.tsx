"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import LoadingButton from "../global/LoadingButton";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Settings2 } from "lucide-react";

export default function EditProject({ 
    title,
    description,
    id
 } : {
    title: string;
    description: string;
    id: string
 }) {
    const router = useRouter();
    const [titleIn, setTitleIn] = useState(title);
    const [descriptionIn, setDescriptionIn] = useState(description);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    async function edit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);

        fetch(`/api/project/${id}`, {
            method: "PUT",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleIn,
                description: descriptionIn,
            }),
        })
        .then((res) => {
            if (res.status != 200) {
                res.json()
                .then((error) => {
                    toast({
                        title: "Wooops something went wrong.",
                        description: error.error,
                        duration: 5000,
                    });
                })
            } else {
                setOpen(false);
                router.refresh();
            }
            setLoading(false);
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Settings2 className="w-4 h-4 mr-2"/>
                    <span>Project settings</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit project</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={edit} id="edit" method="dialog">
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input 
                        placeholder="title" 
                        value={titleIn} 
                        onChange={(e) => setTitleIn(e.target.value)}
                        disabled={loading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea 
                        id="description" 
                        name="description" 
                        placeholder="description" 
                        className="resize-none" 
                        rows={4} 
                        value={descriptionIn} 
                        onChange={(e) => setDescriptionIn(e.target.value)}
                        disabled={loading}
                        />
                    </div>
                </form>
                <DialogFooter>
                    {loading ? <LoadingButton>Saving</LoadingButton> : <Button form="edit" type="submit">Save</Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}