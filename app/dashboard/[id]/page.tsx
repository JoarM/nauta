import AddStage from "@/components/dashboard/AddStage";
import EditProject from "@/components/dashboard/EditProject";
import Members from "@/components/dashboard/Members";
import PlanningBoard from "@/components/dashboard/PlanningBoard";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/firebase";
import { Project } from "@/lib/schemas";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function projectPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        redirect(`/signin?callbackUrl=/dashboard/${encodeURIComponent(params.id)}`);
    }

    const data = await getDoc(doc(db, "projects", params.id));
    const project = data.data() as Project;

    return (
        <>
            <header className="bg-primary py-1 px-8 font-semibold text-lg flex items-center">
                <h1>{ project.title }</h1>

                <Menubar className="ml-4 bg-primary">
                    <MenubarMenu>
                        <AddStage
                        id={data.id}
                        />
                    </MenubarMenu>

                    <MenubarMenu>
                        <Members
                        members={project.members}
                        id={data.id}
                        owner={session.user.email}
                        projectTitle={project.title}
                        />
                    </MenubarMenu>
                    
                    {session.user.email === project.owner && (
                        <MenubarMenu>
                            <EditProject
                            title={project.title}
                            description={project.description}
                            id={data.id}
                            />
                        </MenubarMenu>
                    )}
                </Menubar>
            </header>
            <main className="p-6 grid grid-flow-col gap-4 w-max max-w-full items-start justify-start overflow-auto">
                <PlanningBoard intialStages={project.stages} id={data.id}/>
            </main>
        </>
    )
}