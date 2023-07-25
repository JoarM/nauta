"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import ProjectCard from "./ProjectCard";

type ReducedProject = {
    title: string;
    description: string;
    owner: boolean;
    id: string;
}

export default function Projects({
    projects
} : {
    projects: ReducedProject[]
}) {
    const [searchFilter, setSearchFilter] = useState("");

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
                        <form action="/api/project" method="post" className="grid gap-5" id="create">
                            <div className="grid gap-3">
                                <Label htmlFor="title" className="w-fit">
                                    Project title
                                </Label>
                                <Input name="title" id="title" placeholder="Title"/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description" className="w-fit">
                                    Project description
                                </Label>
                                <Textarea id="description" name="description" placeholder="Description" className="resize-none" rows={4}/>
                            </div>
                        </form>
                        <DialogFooter>
                            <Button type="submit" form="create">Add project</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid mt-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => {
                    if (project.title.toLowerCase().includes(searchFilter.toLowerCase())) return <ProjectCard {...project}/>
                    return null;
                })}
            </div>
        </>
    )
}