import EditProject from "@/components/dashboard/EditProject";
import { db } from "@/lib/firebase";
import { Project } from "@/lib/schemas";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function projectPage({ params }: { params: { id: string } }) {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        redirect(`/signin?callbackUrl=/dashboard/${params.id}`);
    }

    const data = await getDoc(doc(db, "projects", params.id));
    const project = data.data() as Project;

    return (
        <>
            <header className="bg-primary py-1 px-8 font-semibold text-lg flex items-center">
                <h1>{ project.title }</h1>

                <EditProject
                title={project.title}
                description={project.description}
                id={data.id}
                />
            </header>
        </>
    )
}