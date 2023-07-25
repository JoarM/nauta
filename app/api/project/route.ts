import { db } from "@/lib/firebase";
import { Project, ZodProject } from "@/lib/schemas";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unatuenticated" }, { status: 401 });
    if (req.method != "POST") return NextResponse.json({ error: "Incorrect method" }, { status: 405 });
    if (req.credentials != "same-origin") return NextResponse.json({ error: "Not same origion" }, { status: 403 });
    const formdata = await req.formData();

    if (formdata) {
        const title = formdata.get("title");
        const description = formdata.get("description");

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
                        name: "Welcome",
                        tasks: [
                            {
                                task: "Check out the docs or our youtube to get started",
                                id: crypto.randomUUID(),
                            },
                        ],
                        id: crypto.randomUUID(),
                    },
                ],
                invites: [

                ],
            }
            try {
                const docRef = await addDoc(collection(db, "projects"), project);
                const url = req.nextUrl.clone();
                url.pathname = `/dashboard/${docRef.id}`;
                return NextResponse.redirect(url);
            } catch (error) {
                return NextResponse.json({ error: "An error occured when saving the project please try agian" + error }, { status: 500 });
            }
        } else {
            const errorMessage = `${parse.error.issues.length === 1 ? parse.error.issues.at(0)?.message : 
            `${parse.error.issues.at(0)?.message.slice(0, -1)} & ${parse.error.issues.at(1)?.message.toLowerCase()}`}`;
            return NextResponse.json({ error: errorMessage }, { status: 400 });
        }
    }
}