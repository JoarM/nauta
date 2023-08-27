import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/firebase-admin";
import { ZodProject } from "@/lib/schemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params } : { params: { id: string } }) {
    const session = getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unatuenticated" }, { status: 401 });

    const { title, description} = await req.json();

    const parse = await ZodProject.safeParseAsync({
        title: title,
        description: description,
    });

    if (!parse.success) {
        const errorMessage = `${parse.error.issues.length === 1 ? parse.error.issues.at(0)?.message : 
            `${parse.error.issues.at(0)?.message.slice(0, -1)} & ${parse.error.issues.at(1)?.message.toLowerCase()}`}`;
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    try {
        await db.doc(`projects/${params.id}`).update({
            title: title,
            description: description
        });
        return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save changes please try again soon." }, { status: 500 });
    }
}