import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import InviteTemplate from "@/lib/emailTemplates/invite";
import { Member, ZodMember } from "@/lib/schemas";
import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function PUT(req: NextRequest,  { params } : { params: { id: string } }) {
    if (req.credentials != "same-origin") return NextResponse.json({ error: "Not same origion" }, { status: 403 });
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: "Unatuenticated" }, { status: 401 });

    const data = await req.json();

    const { to, projectTitle } = data;
    const projectId = params.id;

    const host = req.headers.get("host");
    if (!host) return NextResponse.json({ error: "No host" }, { status: 500 });

    if (!to || !projectId || !projectTitle) return NextResponse.json({ error: "An error occured, please try again" }, { status: 400 });

    const link = `${host}/invite?projectId=${encodeURIComponent(projectId)}&projectTitle=${encodeURIComponent(projectTitle)}&sender=${encodeURIComponent(session.user.name as string)}&photoUrl=${encodeURIComponent(session.user.image as string)}`;
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) return NextResponse.json({ error: "Something went wrong when processing the request please try agian later." }, { status: 500 });

    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: emailUser,
            pass: emailPassword,
        },
    });

    const email = render(InviteTemplate({
        link: link,
        photoUrl: session.user.image as string,
        sender: session.user.name as string,
        projectName: projectTitle,
        to: to,
        senderEmail: session.user.email as string
    }));

    const options = {
        from: emailUser,
        to: to,
        subject: `${ session.user.name } invited you to join ${projectTitle}`,
        html: email,
    }

    try {
        await transporter.sendMail(options);
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong when sending the invite please try again later." }, { status: 500 });
    }

    return NextResponse.json({ message: `Invite successfuly sent too ${to}` }, { status: 200 });
}

export async function PATCH(req: NextRequest, { params } : { params: { id: string } }) {
    if (req.credentials != "same-origin") return NextResponse.json({ error: "Not same origion" }, { status: 403 });
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.name || !session.user.image || !session.user.email) return NextResponse.json({ error: "Unatuenticated" }, { status: 401 });

    const user: Member = {
        name: session.user.name,
        photoUrl: session.user.image,
        email: session.user.email,
    }

    try {
        await db.doc(`projects/${params.id}`).update({
            members: FieldValue.arrayUnion(user),
            memberEmails: FieldValue.arrayUnion(session.user.email),
        });
        return NextResponse.json({ message: "Joined project successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occured when joining the project please try agian soon." }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params } : { params: { id: string } }) {
    if (req.credentials != "same-origin") return NextResponse.json({ error: "Not same origion" }, { status: 403 });
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unatuenticated" }, { status: 401 });

    const data = await req.json();

    const parse = await ZodMember.safeParseAsync(data);

    if (parse.success) {
        try {
            await db.doc(`projects/${params.id}`).update({
                memberEmails: FieldValue.arrayRemove(data.email),
                members: FieldValue.arrayRemove(data),
            });
            return NextResponse.json({  }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: "An error occured when joining the project please try agian soon." }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Incorrect parameters." }, { status: 400 });
    }
}