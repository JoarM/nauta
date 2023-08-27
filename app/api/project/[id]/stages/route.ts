import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/firebase-admin";
import { Stage, ZodStage } from "@/lib/schemas";
import { FieldValue } from "firebase-admin/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    if (req.credentials != "same-origin") return NextResponse.json({ error: "Not same origion" }, { status: 403 });
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unatuenticated" }, { status: 401 });
    const data = await req.json();

    const { title } = data;
    const parse = await ZodStage.safeParseAsync(title);

    if (parse.success) {
        const stage: Stage = {
            title: title,
            tasks: [],
            id: crypto.randomUUID(),
        }

        try {
            await db.doc(`projects/${params.id}`).update({
                stages: FieldValue.arrayUnion(stage), 
            });
            return NextResponse.json({ message: "Stage added" }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: "An error occured when adding the stage, please try again later" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Please provide a title" }, { status: 400 });
    }
}

export async function PATCH() {

}

export async function DELETE() {

}