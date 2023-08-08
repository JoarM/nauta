import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/firebase";
import { Project, ZodProject } from "@/lib/schemas";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unatuenticated" }, { status: 401 });
    if (req.method != "POST") return NextResponse.json({ error: "Incorrect method" }, { status: 405 });
    if (req.credentials != "same-origin") return NextResponse.json({ error: "Not same origion" }, { status: 403 });
    const data = await req.json();

    const { title, description } = data;

    const parse = await ZodProject.safeParseAsync({
        title: title,
        description: description,
    });

    if (parse.success) {
        if (!session.user?.email || !session.user.name || !session.user.image) return NextResponse.json({ error: "Unatuenticated" }, { status: 401 });
        const project: Project = {
            createdAt: Timestamp.now(),
            title: title as string,
            description: description as string,
            owner: session.user?.email,
            members: [
                {
                    name: session.user.name,
                    photoUrl: session.user.image,
                    email: session.user.email,
                },
            ],
            memberEmails: [
                session.user.email,
            ],
            stages: [
                {
                    title: "Welcome",
                    tasks: [
                        {
                            task: "Check out the docs or our youtube to get started",
                            id: crypto.randomUUID(),
                        },
                    ],
                    id: crypto.randomUUID(),
                },
            ],
        }
        try {
            const docRef = await addDoc(collection(db, "projects"), project);
            return NextResponse.json({ id: docRef.id }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: "An error occured when saving the project please try agian" }, { status: 500 });
        }
    } else {
        const errorMessage = `${parse.error.issues.length === 1 ? parse.error.issues.at(0)?.message : 
        `${parse.error.issues.at(0)?.message.slice(0, -1)} & ${parse.error.issues.at(1)?.message.toLowerCase()}`}`;
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}