"use client";

import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import ProjectCard from "./ProjectCard";
import { ReducedProject } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import LoadingButton from "../global/LoadingButton";

export default function Projects({
    projects,
    email
} : {
    projects: ReducedProject[];
    email: string;
}) {
    const [searchFilter, setSearchFilter] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creating, setCreating] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    function createProject(e: FormEvent) {
        e.preventDefault();
        setCreating(true);
        fetch("/api/project", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
            }),
        })
        .then((res) => {
            if (res.status != 200) {
                res.json()
                .then((data) => {
                    setCreating(false);
                    toast({
                        title: "Wooops something went wrong",
                        description: data.error,
                        duration: 5000,
                    });
                });
            } else {
                res.json()
                .then((data) => {
                    setCreating(false);
                    router.push(`/dashboard/${data.id}`);
                });
            }
        });
    }

    return (
        <>
            <div className="flex gap-2 mt-6">
                <search className="relative w-full">
                    <Search className="h-4 w-4 absolute top-1/2 -translate-y-1/2 left-2"/>
                    <Input placeholder="Filter projects..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} className="pl-8"/>
                </search>
                
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="flex-shrink-0">
                            <Plus className="mr-2 h-4 w-4"/>
                            <span>Add project</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a new project</DialogTitle>
                            <DialogDescription>
                                Add a new planning board for you or your team.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={createProject} className="grid gap-5" id="create">
                            <div className="grid gap-3">
                                <Label htmlFor="title" className="w-fit">
                                    Project title
                                </Label>
                                <Input name="title" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={creating}/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description" className="w-fit">
                                    Project description
                                </Label>
                                <Textarea id="description" name="description" disabled={creating} placeholder="Description" className="resize-none" rows={4} value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </form>
                        <DialogFooter>
                            {creating ? <LoadingButton>Creating project</LoadingButton> : <Button type="submit" form="create">Create project</Button>}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => {
                    if (project.title.toLowerCase().includes(searchFilter.toLowerCase())) return <ProjectCard {...project} key={project.id} email={email}/>
                    return null;
                })}
            </div>
        </>
    )
}