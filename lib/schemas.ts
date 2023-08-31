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
    createdAt: Timestamp | serverTimestamp;
    description: string;
    members: Member[];
    memberEmails: string[];
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
    title: string;
    id: string;
}

const ZodStage = z.string()
.min(1, { message: "A stage must have a title."})
.max(32, { message: "Stage titles may not be more than 32 characthers." });

const ZodStages = z.array(z.object({
    tasks: z.object({
        task: z.string().min(1),
        id: z.string().min(1),
    }),
    title: z.string().min(1),
    id: z.string().min(1),
}));

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

const ZodMember = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    photoUrl: z.string(),
});

type ReducedProject = {
    title: string;
    description: string;
    owner: boolean;
    id: string;
    members: Member[];
}

const ZodFeedback = z.object({
    feedback: z.string()
    .min(1, { message: "Please enter your feedback" })
    .max(128, { message: "Feedback length can not exceed 128 characthers" }),
    rating: z.union([
        z.literal("Awsome"),
        z.literal("Good"),
        z.literal("Meh"),
        z.literal("Horrible")
    ]),
});

const ZodContact = z.object({
    email: z.string().email({message: "U must input a valid email"}),
    name: z.string().min(1, {message: "Please enter a name"}),
    message: z.string().min(1, {message: "Please write something to us"}).max(200, {message: "Message cant be more then 200 characthers"}),
});

export type { Project, Stage, Alert, Member, Task, ReducedProject };
export { ZodTask, ZodStage, ZodProject, ZodFeedback, ZodContact, ZodMember, ZodStages };