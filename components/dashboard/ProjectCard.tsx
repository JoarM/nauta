import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FolderOpenDot, LogOut, Trash2 } from "lucide-react";

interface props {
    title: string;
    description: string;
    owner: boolean;
    id: string;
}

export default function ProjectCard({
    title,
    description,
    owner,
    id
} : props) {
    return (
        <Link className="group relative isolate outline-none" href={`/dashboard/${id}`}>
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
                    <Button variant="destructive" size="icon" className="ml-auto">
                        {owner ? <Trash2 className="w-4 h-4"/> : <LogOut className="w-4 h-4"/>}
                    </Button>
                </CardFooter>
            </Card>
        </Link>        
    )
}