import { GripHorizontal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Stage } from "@/lib/schemas";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "../ui/use-toast";

interface TaskInterface {
    id: string;
    task: string;
    stageIndex: number;
    index: number;
    stages: Stage[];
    projectId: string;
}

export default function TaskComponent({
    id,
    task,
    stageIndex,
    index,
    stages,
    projectId,
} : TaskInterface) {
    const { toast } = useToast();

    const {
        setNodeRef,
        transform,
        attributes,
        listeners,
        active
    } = useSortable({id: id, data: {stageIndex: stageIndex}});

    const style = {
        transform: CSS.Transform.toString(transform),
    }

    function deleteTask() {
        const newTasks = stages[stageIndex].tasks.splice(index, 1);

        updateDoc(doc(db, "projects", projectId), {
            stages: stages,
        })
        .catch(() => {
            toast({
                title: "Error deleting task",
                description: "An error occured when trying to delete the task please try again soon",
                duration: 5000
            });
        });
    }

    return (
        <li 
        key={id} 
        className={`rounded-lg p-2 border bg-background flex justify-between items-center gap-2 shadow ${active?.id === id ? "opacity-50" : ""}`} 
        ref={setNodeRef} 
        style={style}
        >
            <span>{ task }</span>
            <div className="flex flex-shrink-0 gap-1">
                <Button variant="destructive" className="w-8 h-8 p-0" onClick={deleteTask}>
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete task</span>
                </Button>
                <Button variant="outline" className="w-8 h-8 p-0" {...listeners} {...attributes}>
                    <GripHorizontal className="w-4 h-4"/>
                    <span className="sr-only">Drag handles</span>
                </Button>
            </div>
        </li>
    )
}

export function DummyTask({ task } : { task: string }) {
    return (
        <div className="rounded-lg p-2 border bg-background flex justify-between items-center gap-2 shadow ring-2 ring-ring ring-offset-2 ring-offset-background" aria-label="dummy task">
            <span>{ task }</span>
            <div className="flex flex-shrink-0 gap-1">
                <Button variant="destructive" className="w-8 h-8 p-0" aria-disabled>
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete task</span>
                </Button>
                <Button variant="outline" className="w-8 h-8 p-0" aria-disabled>
                    <GripHorizontal className="w-4 h-4"/>
                    <span className="sr-only">Drag handles</span>
                </Button>
            </div>
        </div>
    )
}