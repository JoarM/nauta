"use client";

import { db } from "@/lib/firebase";
import { Project, Stage, Task } from "@/lib/schemas";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, Over, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import StageComponent from "./Stage";
import { DummyTask } from "./Task";

export default function PlanningBoard({ intialStages, id } : { intialStages: Stage[], id: string }) {
    const [activeTask, setActiveTask] = useState<null | Task>(null); 
    const router = useRouter();
    const [stages, setStages] = useState(intialStages);
    const { toast } = useToast();

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "projects", id), 
        (snapshot) => {
            const data = snapshot.data() as Project;
            setStages(data.stages);
        },
        (error) => {
            toast({
                title: "Error when connecting to server",
                description: error.message,
                action: <ToastAction altText="Refresh" onClick={() => router.refresh()}>Refresh</ToastAction>,
                duration: 5000,
            });
        });

        return () => {
            unsubscribe();
        };
    }, [id]);

    function handleDragStart(e: DragStartEvent) {
        const { active } = e;
        const activeStage = active.data.current?.stageIndex;
        if (activeStage === undefined || activeStage === null) return;

        const task = stages[activeStage].tasks.find(task => task.id === active.id);
        if (!task) return;
        setActiveTask(task);
    }

    function handleDragEnd(e: DragEndEvent) {
        const {active, over} = e;
        if (!over) return;
        console.log(active, over);

        const activeStage = active.data.current?.stageIndex;
        const overObject = getOverStage(over);
        if (overObject === null) return; 
        const {stage: overStage, item: overIsItem} = overObject;
        if (activeStage === null || activeStage === undefined || overStage === null) return;
        console.log("1");

        const activeIndex = stages[activeStage].tasks.findIndex(task => task.id === active.id);
        let overIndex = stages[overStage].tasks.findIndex(task => task.id === over.id);
        if (!overIsItem) overIndex = 0;
        if (activeIndex === -1 || overIndex === -1) return;
        console.log("2");

        const mutatedStages = stages;

        if (activeStage === overStage) {
            console.log("3");
            mutatedStages[overStage].tasks = arrayMove(stages[overStage].tasks, activeIndex, overIndex);

            updateDoc(doc(db, "projects", id), {
                stages: mutatedStages,
            })
            .catch((error) => {
                toast({
                    title: "Error updating project.",
                    description: error.message,
                    duration: 5000
                });
            });
        } 
        else {
            console.log("4")
            mutatedStages[overStage].tasks.splice(overIndex, 0, stages[activeStage].tasks[activeIndex]);
            mutatedStages[activeStage].tasks.splice(activeIndex, 1);

            updateDoc(doc(db, "projects", id), {
                stages: mutatedStages,
            })
            .catch((error) => {
                toast({
                    title: "Error updating project.",
                    description: error.message,
                    duration: 5000
                });
            });
        }
        setActiveTask(null);
    }

    function getOverStage(over: Over) {
        const data = over.data.current?.stageIndex;
        if (data != null && data != undefined) return {
            stage: data,
            item: true,
        };
        const id = stages.findIndex(stage => stage.id === over.id);
        if (id != -1) return {
            stage: id,
            item: false,
        };
        return null;
    }

    return (
        <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        >
            {stages.map((stage, index) => <StageComponent {...stage} stages={stages} index={index} key={stage.id} projectId={id} />)}
            <DragOverlay>{activeTask ? <DummyTask task={activeTask.task}/> : null}</DragOverlay>
        </DndContext>
    )
}