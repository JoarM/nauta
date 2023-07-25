import { Timestamp } from "firebase/firestore";
import { Timestamp as serverTimestamp } from "firebase-admin/firestore";
import { z } from "zod";

type Alert = {
    type: "error" | "success" | "information";
    project: string;
    message: string;
    createdAt: Timestamp | serverTimestamp;
    id: string;
}

type Project = {
    createdAt: Timestamp;
    description: string;
    members: Member[];
    memberEmails: string[];
    invites: string[];
    title: string;
    owner: string;
    stages: Stage[];
}

const ZodProject = z.object({
    title: z.string()
    .min(2, { message: "Title must be more than 2 characthers." })
    .max(64, { message: "Title cant be more than 64 characthers." }),
    description: z.string()
    .max(256, { message: "Description cant be more than 256 characthers."}),
});

type Stage = {
    tasks: Task[];
    name: string;
    id: string;
}

const ZodStage = z.string()
.min(1, { message: "A stage must have a name."})
.max(32, { message: "Stage names may not be more than 32 characthers." });

type Task = {
    id: string;
    task: string;
}

const ZodTask = z.string()
.min(1, { message: "U need to enter a task." })
.max(128, { message: "Tasks may not be more than 128 characthers." });

type Member = {
    name: string;
    photoUrl: string | null;
    email: string;
}

export type { Project, Stage, Alert, Member, Task };
export { ZodTask, ZodStage, ZodProject };