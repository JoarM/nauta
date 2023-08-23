import { authOptions } from "@/lib/auth/authOptions";
//import { db } from "@/lib/firebase";
import { db } from "@/lib/firebase-admin";
import { ZodContact } from "@/lib/schemas";
//import { addDoc, collection } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "You need to be logged in to contact us" }, { status: 401 });
    if (req.credentials != "same-origin") return NextResponse.json({ error: "Not same origion" }, { status: 403 });

    const data = await req.json();

    const parse = await ZodContact.safeParseAsync(data);

    if (parse.success) {
        try {
            const docRef = await db.collection("contact").add(data);
            //addDoc(collection(db, "contact"), data);
            return NextResponse.json({ message: docRef }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: "An error occured when saving sending your message please try again later" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: "Please provide your name, email and a message no longer then 200 characthers" }, { status: 400 });
    }
}