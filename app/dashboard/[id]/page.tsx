import EditProject from "@/components/dashboard/EditProject";
import Members from "@/components/dashboard/Members";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
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

                <Menubar className="ml-4 bg-primary">
                    <MenubarMenu>
                        <EditProject
                        title={project.title}
                        description={project.description}
                        id={data.id}
                        />
                    </MenubarMenu>
                    <MenubarMenu>
                        <Members
                        members={project.members}
                        id={data.id}
                        owner={session.user.email}
                        />
                    </MenubarMenu>
                </Menubar>
            </header>
        </>
    )
}