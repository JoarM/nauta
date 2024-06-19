"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import LoadingButton from "../global/LoadingButton";
import { useToast } from "../ui/use-toast";
import FormStatus from "../global/FormstatusButton";

export default function AddStage({ id } : { id: string }) {
    const [adding, setAdding] = useState(false);
    const [open, setOpen] = useState(false);
    const form = useRef<HTMLFormElement>(null);
    const { toast } = useToast();

    async function createStage(formData: FormData) {
        const title = formData.get("title")?.valueOf();

        const res = await fetch(`/api/project/${id}/stage`, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
            }),
        });

        
        if (res.ok) {
            setOpen(false);
            form.current?.reset();
        } else {
            setAdding(false);
            const data = await res.json();

            toast({
                title: "Wooops something went wrong",
                description: data.error,
                duration: 5000,
            });
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
                <form className="grid gap-2" id="newStage" action={createStage} ref={form}>
                    <Label htmlFor="title">Stage title</Label>
                    <Input placeholder="title" name="title" id="title" disabled={adding} />
                    <FormStatus>
                        <Button type="submit" form="newStage" className="w-fit mt-2 ml-auto">
                            <Plus className="mr-2 w-4 h-4" />
                            <span>Add stage</span>
                        </Button>
                        <LoadingButton className="w-fit mt-2 ml-auto">
                            Adding stage
                        </LoadingButton>
                    </FormStatus>
                </form>
            </DialogContent>
        </Dialog>
    )
}