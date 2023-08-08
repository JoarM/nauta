import { Stage, Task, ZodStage, ZodTask } from "@/lib/schemas";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRight, Plus, Settings, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskComponent from "./Task";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import LoadingButton from "../global/LoadingButton";
import { useToast } from "../ui/use-toast";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useDroppable } from "@dnd-kit/core";

interface StageInterface {
    stages: Stage[];
    tasks: Task[];
    title: string;
    id: string;
    index: number;
    projectId: string;
}

export default function StageComponent({
    stages,
    tasks,
    title,
    id,
    index,
    projectId
} : StageInterface) {
    const { toast } = useToast();
    const [taskOpen, setTaskOpen] = useState(false);
    const [newTask, setNewTask] = useState("");
    const [creating, setCreating] = useState(false);
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updating, setUpdating] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const { setNodeRef } = useDroppable({id: id});

    async function createTask(e: FormEvent) {
        e.preventDefault();
        setCreating(true);

        const parse = await ZodTask.safeParseAsync(newTask);

        if (parse.success) {
            const task: Task = {
                task: newTask,
                id: crypto.randomUUID(),
            }

            stages[index].tasks.push(task);

            updateDoc(doc(db, "projects", projectId), {
                stages: stages,
            })
            .then(() => {
                setNewTask("");
                setTaskOpen(false);
            })
            .catch(() => {
                toast({
                    title: "Error creating task",
                    description: "An error occured when trying to create the task please try again soon",
                    duration: 5000,
                });
            })
            .finally(() => {
                setCreating(false);
            });
        } else {
            toast({
                title: "Invalid task",
                description: parse.error.issues.at(0)?.message,
                duration: 5000,
            });
            setCreating(false);
        }
    }

    function deleteStage() {
        stages.splice(index, 1);

        updateDoc(doc(db, "projects", projectId), {
            stages: stages,
        })
        .catch(() => {
            toast({
                title: "Error deleteing stage",
                description: "An error occured when trying to delete the stage please try again soon",
                duration: 5000,
            });
        });
    }

    async function updateStage(e: FormEvent) {
        e.preventDefault();
        setUpdating(true);

        const parse = await ZodStage.safeParseAsync(updateTitle);

        if(parse.success) {
            stages[index].title = updateTitle;

            updateDoc(doc(db, "projects", projectId), {
                stages: stages,
            })
            .catch(() => {
                toast({
                    title: "Error updating",
                    description: "An error occured when trying to update please try agian soon",
                    duration: 5000,
                });
            })
            .finally(() => {
                setUpdating(false);
            });
            setUpdateOpen(false);
        } else {
            toast({
                title: "Invalid title",
                description: parse.error.issues.at(0)?.message,
                duration: 5000
            });
            setUpdating(false);
        }
    }

    function movePrev() {
        if (index <= 0) return;

        updateDoc(doc(db, "projects", projectId), {
            stages: arrayMove(stages, index, index - 1),
        })
        .catch(() => {
            toast({
                title: "Error updating",
                description: "An error occured when trying to update please try agian soon",
                duration: 5000,
            });
        });
    }

    function moveNext() {
        if (index >= stages.length - 1) return;

        updateDoc(doc(db, "projects", projectId), {
            stages: arrayMove(stages, index, index + 1),
        })
        .catch(() => {
            toast({
                title: "Error updating",
                description: "An error occured when trying to update please try agian soon",
                duration: 5000,
            });
        });
    }

    return (
        <Card className="w-96 flex-shrink-0" key={id}>
            <CardHeader>
                <CardTitle>{ title }</CardTitle>
                <div className="flex items-center justify-between">
                    <Button size="icon" variant="outline" disabled={index === 0} onClick={movePrev}>
                        <ChevronLeftIcon className="w-4 h-4" />
                        <span className="sr-only">Move back</span>
                    </Button>
                    <Button  size="icon" variant="outline" disabled={index === stages.length - 1} onClick={moveNext}>
                        <ChevronRight className="w-4 h-4" />
                        <span className="sr-only">Move forward</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="rounded-lg bg-primary border p-3 grid gap-2" ref={setNodeRef}>
                    <SortableContext
                    items={tasks}
                    id={id}
                    strategy={verticalListSortingStrategy}
                    >
                        {tasks.map((task, taskIndex) => <TaskComponent {...task} stageIndex={index} key={task.id} index={taskIndex} stages={stages} projectId={projectId} />)}
                    </SortableContext>
                </ul>
            </CardContent>
            <CardFooter>
                <div className="ml-auto flex gap-1">
                    <Dialog open={taskOpen} onOpenChange={setTaskOpen}>
                        <DialogTrigger asChild>
                            <Button variant="secondary" size="icon">
                                <Plus className="w-4 h-4" />
                                <span className="sr-only">Add task</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create task</DialogTitle>
                                <DialogDescription>Create a new task</DialogDescription>
                            </DialogHeader>
                            <form id="newTask" className="grid gap-2" onSubmit={createTask}>
                                <Label>Task description</Label>
                                <Input placeholder="task" value={newTask} onChange={(e) => setNewTask(e.target.value)} disabled={creating} />
                            </form>
                            <DialogFooter>
                                {creating ? 
                                    <LoadingButton>Creating</LoadingButton>
                                :
                                    <Button form="newTask">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create task
                                    </Button>
                                }
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
                        <DialogTrigger asChild>
                            <Button variant="secondary" size="icon">
                                <Settings className="w-4 h-4" />
                                <span className="sr-only">Edit stage</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit stage {title}</DialogTitle>
                            </DialogHeader>
                            <form className="grid gap-2" id="update" onSubmit={updateStage}>
                                <Label>Title</Label>
                                <Input placeholder="title" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} disabled={updating} />  
                            </form>
                            <DialogFooter>
                                {updating ? <LoadingButton>Updating</LoadingButton> : <Button form="update">Update</Button>}
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                                <Trash2 className="w-4 h-4" />
                                <span className="sr-only">Delete stage</span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete stage { title }</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action is permanent an can not be undone. Are u sure u want to delete stage { title }?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={deleteStage}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardFooter>
        </Card>
    )
}